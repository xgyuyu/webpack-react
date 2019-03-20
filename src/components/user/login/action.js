import * as types from './types';

export function changeValue(key, value) {
  return {
    type: types.CHANGE_VALUE,
    key,
    value,
  };
}
export function login(name, password, referpage) {
  return {
    type: types.LOGIN,
    param: {
      name,
      password,
      referpage,
      state: 1,
    },
  };
}

export function loginResult(data) {
  return {
    type: types.LOGIN_RESULT,
    data,
  };
}
