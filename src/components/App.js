import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'


const App = () => (
  <div>
    <Link to="/">主页</Link>
    <Link to="/about">关于我们</Link>
    <br />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
)

export default App
