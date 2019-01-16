import React, { Component } from 'react'
import { Icon, Input, Button } from 'antd'
import './login.less'
import { connect } from 'react-redux'
import { changeUsername, changePassword, login } from './action'

export class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props
    return (
      <div className='login'>
        <h2>学生管理系统</h2>
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={props.username} onChange={(e) => {console.log(props);props.dispatch(changeUsername(e.target.value))}} placeholder="Username" />
        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"  value={props.password}  onChange={(e) => {props.dispatch(changePassword(e.target.value))}} placeholder="Password" />
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {props.dispatch(login(props.username, props.password))}}>
          登录
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password
  }
}

export default connect(mapStateToProps)(Login)
