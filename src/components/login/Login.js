import React, { Component } from 'react'
import { Icon, Input, Button } from 'antd';
import './login.less'
import Password from 'antd/lib/input/Password';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePasswd = this.updatePasswd.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.state = {
      // val: 'Hello Word'
        Username: '',
        Password: ''
    }
  }
  updateUsername(ev) {
    this.setState({
      Username: ev.target.value
    })
  }
  updatePasswd(ev) {
    this.setState({
      Password: ev.target.value
    })
  }
  submitLogin() {
    console.log(this.state)
  }
  render() {
    return (
      <div className='login'>
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.state.Username} onChange={this.updateUsername} placeholder="Username" />
        <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}  value={this.state.Password}  onChange={this.updatePasswd} placeholder="Password" />
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.submitLogin}>
          登录
        </Button>
      </div>
    )
  }
}

export default Login
