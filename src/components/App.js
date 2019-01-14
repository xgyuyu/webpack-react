import React, { Component } from 'react'
import AddTodoConnect from '../containers/AddTodoConnect'

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <AddTodoConnect></AddTodoConnect>
      </div>
    )
  }
}

