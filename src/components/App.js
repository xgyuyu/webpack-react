import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Home from './home/Home'
import {checkLogin} from '../common/index'

// export class App extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <Route path='/home' component={Home}></Route>
//       </div>
//     )
//   }
// }

const App = () => {
  useEffect(() => {
    console.log(123)
    checkLogin()
    console.log(localStorage.getItem('username'))
  })
  return(
    <div className="App">
     <Route path='/home' component={Home}></Route>
   </div>
  )
}

export default App
