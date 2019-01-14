import React, { Component } from 'react'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { todos, toggleTodo } = this.props
    return (
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id} onClick={() => toggleTodo(todo.id)} className={todo.completed ? 'list-select' : 'list'}>{todo.text}</li>
          ))
        }
      </ul>
    )
  }
}
