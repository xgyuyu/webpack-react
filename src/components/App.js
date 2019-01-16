import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
// import { increment, incrementAsync } from '../actions/counter'
import Login from './login/Login'
import Home from './home/Home'

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Link to="/home">主页</Link>
        <Route path='/home' component={Home}></Route>
      </div>
    )
  }
}

/* const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
} */

export default App
// export default connect(mapStateToProps, { increment, incrementAsync })(App)
