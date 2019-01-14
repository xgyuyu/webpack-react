import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, incrementAsync } from '../actions/counter'

console.log(increment())

export class App extends Component {
  constructor(props) {
    super(props)
    this.isOddAdd = this.isOddAdd.bind(this)
  }

  isOddAdd() {
    if (this.props.counter % 2 === 0) {
      this.props.increment()
    } 
  }

  render() {
    return (
      <div className="App">
        <p>我是测试的标题</p>
        {this.props.counter}
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.isOddAdd}>+Odd</button>
        <br />
        <button onClick={this.props.incrementAsync}>Async+</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

export default connect(mapStateToProps, { increment, incrementAsync })(App)
