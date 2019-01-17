import React, { Component } from 'react'
import { Table } from 'antd'

export class StuList extends Component {
  render() {
    const props = this.props
    return (
      <div>
        <Table columns={props.columns} dataSource={props.list} rowKey="id"/>
      </div>
    )
  }
}

export default StuList
