import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.toAbout = this.toAbout.bind(this)
  }

  toAbout() {
    console.warn(123)
    // console.log(this.props)
    const { history } = this.props
    history.push('/about')
  }

  render() {
    return (
      <div>
        我是home
        <button type="button" onClick={this.toAbout}>跳转关于</button>
      </div>
    )
  }
}

export default Home
