import React, { Component } from 'react'

export class Addtodo extends Component {
  constructor(props) {
    super(props)
  }

  addTodo() {
    const { addTodo } = this.props
    let myInputDom = this.refs.myinput
    addTodo(myInputDom.value)
    myInputDom.value = ''
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="请输入内容" ref="myinput"/>
        <input type="button" value="添加" onClick={this.addTodo}/>
      </div>
    )
  }
}

Addtodo.prototype = {
  addTodo: React.PropTypes.func.isRequired
}

export default Addtodo
