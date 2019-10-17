import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.less'
import './css/index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'

/* var a = 1
console.log(a)
function a() {
  aaaaa
} */

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('app'),
)
