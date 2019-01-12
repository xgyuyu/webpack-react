import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'

export class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">主页</Link>
        <Link to="/about">关于我们</Link>
        <br />
        <Route exact path='/' component={Home}></Route>
        <Route path='/about' component={About}></Route>
      </div>
    )
  }
}

export default App
