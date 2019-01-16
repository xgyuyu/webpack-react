import React, { Component } from 'react'
import { Table } from 'antd'
import './home.less'
import { connect } from 'react-redux'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
}]
const data = []
export class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  render() {
    const props = this.props
    console.log(props)
    return (
      <div className="homeTable">
      123
        <Table columns={columns} dataSource={props.list.list} size="middle" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.home
  }
}

export default connect(mapStateToProps)(Home)
