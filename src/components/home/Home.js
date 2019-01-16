import React, { Component } from 'react'
import { Table } from 'antd'
import './home.less'
import { getstudata } from './action'
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
}];
const data = []
export class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.dispatch(getstudata())
    console.log(123)
  }
  render() {
    const props = this.props
    return (
      <div className="homeTable">
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Home)
