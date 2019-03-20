import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, Popconfirm } from 'antd';
import { changeValue, showUsersList, deleteUser, editInitdata } from './action';
import EditModal from './userModal';
import style from './style.css';

class UsersTable extends React.Component {
  componentWillMount() {
    this.props.dispatch(showUsersList());
  }
  render() {
    const {
      dispatch, userInfoList, count, load,
    } = this.props;
    if (load) {
      return (
        <div>
          <Table
            columns={
              [
                {
                  title: '用户名',
                  dataIndex: 'userName',
                  key: 'userName',
                }, {
                  title: '权限信息',
                  dataIndex: 'actionList.isPublish',
                  key: 'permission',
                }, {
                  title: '是否外网登陆',
                  dataIndex: 'isRemote',
                  key: 'remote',
                }, {
                  title: '创建时间',
                  dataIndex: 'createTime',
                  key: 'time',
                }, {
                  title: '更新时间',
                  dataIndex: 'lastUpateTime',
                  key: 'timeupdate',
                }, {
                  title: '登陆时间',
                  dataIndex: 'lastLoginTime',
                  key: 'timelogin',
                }, {
                  title: '操作',
                  key: 'operate',
                  render: (text, record) => (
                    <div>
                      <Button
                        icon="edit" className={style.userMarginR}
                        onClick={() => {
                          dispatch(editInitdata(record));
                          dispatch(changeValue('editUserVisible', true));
                        }}
                      > 编辑
                      </Button>
                      <Popconfirm
                        placement="left" title="确认要删除此用户吗?"
                        onConfirm={() => {
                          dispatch(deleteUser(record.userId));
                        }}
                      >
                        <Button icon="delete" className={style.userMarginR} >
                          删除
                        </Button>
                      </Popconfirm>
                    </div>
                  ),
                },
              ]
            }
            dataSource={userInfoList}
            pagination={{ defaultCurrent: 1, total: count }}
          />
          <EditModal {...this.props} />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="small" />
      </div>
    );
  }
}

UsersTable.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  count: PropTypes.number,
  currentPage: PropTypes.number,
  userInfoList: PropTypes.arrayOf(PropTypes.shape({})),
};
export default UsersTable;
