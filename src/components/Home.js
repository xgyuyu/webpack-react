import React, { Component } from 'react'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.toAbout = this.toAbout.bind(this)
  }
  toAbout() {
    this.props.history.push('/about')
  }
  render() {
    return (
      <div>
        我是home
        <button onClick={this.toAbout}>跳转关于</button>
      </div>
    )
  }
}

export default Home
