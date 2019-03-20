import * as types from './types';

export function init() {
  return {
    type: types.INIT,
  };
}
export function editInitdata(data) {
  return {
    type: types.EDIT_INIT,
    data,
  };
}
export function addInit() {
  return {
    type: types.ADD_INIT,
  };
}

export function changeValue(key, value) {
  return {
    type: types.CHANGE_VALUE,
    key,
    value,
  };
}

export function showUsersList() {
  return {
    type: types.SHOW_USERS_LIST,
  };
}
export function editUserInfo(params) {
  return {
    type: types.EDIT_USER_INFO,
    params,
  };
}
export function addUserInfo(params) {
  return {
    type: types.ADD_USER_INFO,
    params,
  };
}
export function deleteUser(userId) {
  return {
    type: types.DELETE_USER,
    userId,
  };
}
