import assign from 'object-assign';
import { message } from 'antd';
import * as types from './types';

const defaultState = {
  load: false,
  addBtnLoad: false,
  count: 0,
  userInfoList: [],
  addUserName: '',
  editUserName: '',
  editUserPaswd: '',
  addUserPaswd: '',
  isRemote: 1,
  addisRemote: 1,
  editUserGroup: 0,
  addUserGroup: 0,
  addPermission: [],
  permission: [],
  editUserInfoInit: {},
  addUserVisible: false,
  editUserVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT:
      return defaultState;
    case types.SHOW_USERS_LIST:
      return assign({}, state, {
        load: false,
      });
    case types.SHOW_USERS_LIST_RESULT:
      return assign({}, state, {
        load: true,
        userInfoList: action.data.list,
        count: action.data.count,
      });
    case types.EDIT_INIT:
      return assign({}, state, {
        editUserId: action.data.userId,
        editUserName: action.data.userName,
        isRemote: action.data.isRemote === '1' ? 1 : 0,
        editUserGroup: action.data.roleType === '1' ? 1 : 0,
        permission: [action.data.actionList.isPublish === '1' ? 'isPublish' : ''],
      });
    case types.ADD_USER_INFO:
      return assign({}, state, {
        addBtnLoad: true,
      });
    case types.ADD_USER_INFO_RESULT:
      message.success('添加成功！');
      return assign({}, state, {
        addBtnLoad: false,
      });
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
