import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Input, message, Badge, Spin } from 'antd';
import { getUserInfo } from '../../../lib/userInfo';
import { changeValue, updatePswd } from './action';
import style from './style.css';


class MyAccount extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'nav_init_user_info' });
  }
  render() {
    if (this.props.load) {
      const props = this.props;
      const dispatch = props.dispatch;
      const userInfo = getUserInfo();
      return (
        <div>
          <span className={style.userLeft}>用户组 :</span>
          {
            userInfo.roleType === '1' ? '管理员' : '普通用户'
          }
          <hr className={style.hr} />
          <div className={style.userInputBg2}>
            <span className={style.userLeft}>用户名 :</span>
            <div className={style.userInput2}>{userInfo.userName}</div>
            <hr className={style.hr} />
            <span className={style.userLeft}>修改密码 :</span>
            <Button onClick={() => dispatch(changeValue('updatePaswdVisible', true))}>修改密码</Button>
          </div>
          <hr className={style.hr} />
          <span className={style.userLeft}>远程登录:</span>
          { userInfo.isRemote === '1' ? '允许' : '禁止' }
          <hr className={style.hr} />
          <span className={style.userLeft}>权限:</span>
          {
            userInfo.actionList && userInfo.actionList.isPublish === '1' ?
              <Badge status="success" text="发布菜单" className={style.Badge} />
              :
              ''
          }
          <hr className={style.hr} />
          {
            props.updatePaswdVisible ?
              <Modal
                visible
                title="修改密码"
                onOk={() => {
                  if (!props.upPaswd || props.upPaswd.trim().length < 1) {
                    return message.error('非法的密码');
                  }
                  dispatch(changeValue('updatePaswdVisible'), false);
                  return dispatch(updatePswd(userInfo.userId, userInfo.userName, props.upPaswd));
                }}
                onCancel={() => dispatch(changeValue('updatePaswdVisible'), false)}
              >
                <Input
                  placeholder="请输入新密码"
                  onChange={e => dispatch(changeValue('upPaswd', e.target.value))}
                />
              </Modal>
              :
              null
          }
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
}
MyAccount.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
};

const propsMaptoState = state => state['user/myAccount'];
export default connect(propsMaptoState)(MyAccount);

