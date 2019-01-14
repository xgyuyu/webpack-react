import React, { Component } from 'react'

export class Link extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { active, children, onClick } = this.props
    if (active) {
      return( <span>{children}</span> )
    } else {
      return (
        <a href="javascript: void(0)" onClick={() => {onClick}}>{children}</a>
      )
    }
  }
}

export default Link
