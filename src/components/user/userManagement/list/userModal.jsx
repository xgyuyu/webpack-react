import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message, Checkbox, Radio } from 'antd';
import { changeValue, editUserInfo } from './action';
import style from './style.css';

const optios = [
  { label: '菜单发布', value: 'isPublish' },
];

const EditModal = (props) => {
  if (!props.editUserVisible) return null;
  const { dispatch } = props;
  return (
    <Modal
      title="修改用户信息"
      visible={props.editUserVisible}
      onOk={() => {
        if (props.editUserName.trim().length < 1) {
          return message.warning('用户名不合法');
        }
        dispatch(editUserInfo({
          userId: props.editUserId,
          name: props.editUserName,
          pass: props.editUserPaswd,
          isRemote: props.isRemote ? 1 : 0,
          roleType: props.editUserGroup ? 1 : 0,
          isPublish: props.permission.indexOf('isPublish') > -1 ? 1 : 0,
        }));
        return dispatch(changeValue('editUserVisible', false));
      }}
      onCancel={() => {
        dispatch(changeValue('editUserVisible', false));
      }}
    >
      <div>
        <span className={style.userLeft}>用户组 :</span>
        <Radio.Group
          onChange={e => (
            dispatch(changeValue('editUserGroup', e.target.value))
          )}
          value={props.editUserGroup} className={style.userRight}
        >
          <Radio key="roleType" value={1}>管理员</Radio>
          <Radio key="normal" value={0}>普通用户</Radio>
        </Radio.Group>
      </div>
      <div className={style.userInputBg}>
        <span className={style.userLeft}>用户名 :</span>
        <div className={style.userInput2}>{props.editUserName}</div>
        <hr className={style.hr} />
        <span className={style.userLeft}>密码 :</span>
        <Input
          value={props.editUserPaswd} className={style.userInput}
          onChange={e => dispatch(changeValue('editUserPaswd', e.target.value))}
        />
      </div>
      <div>
        <span className={style.userLeft}>外网登录:</span>
        <Radio.Group
          onChange={e => (
            dispatch(changeValue('isRemote', e.target.value))
          )}
          value={props.isRemote}
        >
          <Radio key="isRemote" value={1} >允许</Radio>
          <Radio key="Remote" value={0}>禁止</Radio>
        </Radio.Group>
      </div>
      <div className={style.userInputBg2}>
        <span className={style.userLeft}>权限 :</span>
        <div className={style.userRight2}>
          <Checkbox.Group
            options={optios}
            value={props.permission}
            onChange={(check) => {
              dispatch(changeValue('permission', check));
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
EditModal.propTypes = {
  dispatch: PropTypes.func,
  editUserGroup: PropTypes.number,
  editUserId: PropTypes.number,
  isRemote: PropTypes.number,
  permission: PropTypes.arrayOf(PropTypes.shape({})),
  editUserVisible: PropTypes.bool,
  editUserName: PropTypes.string,
  editUserPaswd: PropTypes.string,
};


export default EditModal;

