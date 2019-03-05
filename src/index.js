import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.less'
import './css/index.css'
import Button from 'react-button-xgy'

console.log(<Button text={'123'} onClick={() => {console.log(1)}}></Button>)
const App = () => {
  return (
    <div>
      123
      <Button text={'123'} onClick={() => {console.log(1)}}></Button>
    </div>
  )
}
ReactDOM.render( <App />, document.getElementById('app'))
