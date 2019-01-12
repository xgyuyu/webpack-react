import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, incrementAsync } from '../actions/counter'

console.log(increment())

export class App extends Component {
  render() {
    return (
      <div className="App">
        <p>我是测试的标题</p>
        {this.props.counter}
        <button onClick={this.props.increment}>+</button>
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
