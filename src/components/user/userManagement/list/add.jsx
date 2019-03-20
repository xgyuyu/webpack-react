import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Input, message, Checkbox, Radio, Button, Alert } from 'antd';
import { changeValue, addUserInfo, addInit } from './action';
import style from './style.css';

const optios = [
  { label: '菜单发布', value: 'isPublish' },
];


class AddUser extends React.Component {
  componentWillMount() {
    this.props.dispatch(addInit());
  }
  render() {
    const props = this.props;
    const { dispatch } = this.props;
    return (
      <Card
        title="添加用户"
      >
        <div>
          <span className={style.userLeft}>用户组 :</span>
          <Radio.Group
            onChange={e => (
              dispatch(changeValue('addUserGroup', e.target.value))
            )}
            value={props.addUserGroup} className={style.userRight}
          >
            <Radio key="roleType" value={1}>管理员</Radio>
            <Radio key="normal" value={0}>普通用户</Radio>
          </Radio.Group>
        </div>
        <div className={style.userInputBg}>
          <span className={style.userLeft}>用户名 :</span>
          <Input
            value={props.addUserName} className={style.userInput}
            onChange={e => props.dispatch(changeValue('addUserName', e.target.value))}
          />
          <div className={style.userWarning} >
            <Alert
              message="只允许汉字和数字组合，且不大于6位占位字符" type="warning"
            />
          </div>
          <hr className={style.hr} />
          <span className={style.userLeft}>密码 :</span>
          <Input
            value={props.addUserPaswd} className={style.userInput}
            onChange={e => dispatch(changeValue('addUserPaswd', e.target.value))}
          />
        </div>
        <div>
          <span className={style.userLeft}>外网登录 :</span>
          <Radio.Group
            onChange={e => (
              dispatch(changeValue('addisRemote', e.target.value))
            )}
            value={props.addisRemote}
          >
            <Radio key="isRemote" value={1} >允许</Radio>
            <Radio key="Remote" value={0}>禁止</Radio>
          </Radio.Group>
        </div>
        <div className={style.userInputBg3}>
          <span className={style.userLeft}>权限 :</span>
          <div className={style.userRight2}>
            <Checkbox.Group
              options={optios}
              value={props.addPermission}
              onChange={(check) => {
                dispatch(changeValue('addPermission', check));
              }}
            />
          </div>
        </div>
        <Button
          type="primary" className={style.userRight2}
          loading={props.addBtnLoad}
          onClick={() => {
            const reg = /^[\u2E80-\u9FFF,\d]+$/;
            if (!props.addUserName ||
              !reg.test(props.addUserName) ||
              props.addUserName.trim().length > 6
            ) {
              return message.warning('用户名只允许汉字和数字组合，且不大于6位占位字符');
            }
            if (!props.addUserPaswd || props.addUserPaswd.trim().length < 1) {
              return message.warning('请为用户设置初始密码吧');
            }
            return dispatch(addUserInfo({
              name: props.addUserName,
              pass: props.addUserPaswd,
              isRemote: props.addisRemote ? 1 : 0,
              roleType: props.addUserGroup ? 1 : 0,
              isPublish: props.addPermission.indexOf('isPublish') > -1 ? 1 : 0,
            }));
          }}
        >添加
        </Button>
      </Card>
    );
  }
}

AddUser.propTypes = {
  dispatch: PropTypes.func,
};

const propsMaptoState = state => state['user/userManagement/add'];
export default connect(propsMaptoState)(AddUser);
