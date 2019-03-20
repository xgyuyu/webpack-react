import * as types from './types';

export function changeValue(key, value) {
  return {
    type: types.CHANGE_VALUE,
    key,
    value,
  };
}
export function updatePswd(userId, name, pass) {
  return {
    type: types.CHANGE_PASWD,
    userId,
    name,
    pass,
  };
}
