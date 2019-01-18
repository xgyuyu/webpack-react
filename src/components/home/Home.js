import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import './home.less'
import { connect } from 'react-redux'
import { getstudata, viewdetail, isvisible, date } from './action'
import { loginout } from '../login/action'
import StuList from './stuList/StuList'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      columns: [{
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '年龄',
        dataIndex: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
      }, {
        title: '操作',
        render: (text, params) => {
          return (
            <Button type="primary" htmlType="submit" onClick={() => {this.props.dispatch(viewdetail(params))}} className="login-form-button">
              查看详情
            </Button>
          )
        }
      }]
    }
  }
  componentWillMount() {
    this.props.dispatch(getstudata())
  }
  render() {
    const props = this.props
    return (
      <div className="home_table">
      <p>
        <span className="login_title">欢迎</span>
        <Button className="logout_btn" type="primary" onClick={() => {this.props.dispatch(date())}}>时间</Button>
        <Button className="logout_btn" type="primary" onClick={() => {this.props.dispatch(loginout())}}>退出</Button>
      </p>
        <Modal
          title="查看详情"
          visible={props.isVisible}
          onOk={() => {this.props.dispatch(isvisible(false))}}
          onCancel={() => {this.props.dispatch(isvisible(false))}}
        >
        <p>姓名：{props.detail.name}</p>
        <p>年龄：{props.detail.age}</p>
        <p>住址：{props.detail.address}</p>
        </Modal>
        <StuList columns={this.state.columns} list={props.list}></StuList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.home.list,
    detail: state.home.detail,
    isVisible: state.home.isVisible
  }
}

export default connect(mapStateToProps)(Home)
