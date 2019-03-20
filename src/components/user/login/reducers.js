import assign from 'object-assign';
import { LOCATION_CHANGE } from 'react-router-redux';
import Cookies from 'js-cookie';
import * as types from './types';

const defaultState = {
  name: '',
  password: '',
  open: true,
  token: '',
  sign: '',
  roleType: '',
  referpage: '/',
};


const excludePath = '/login';
const adminList = '/user/list';
const adminAdd = '/user/add';

function recordReferPage(referpage, state) {
  if (referpage.startsWith(adminList) || referpage.startsWith(adminAdd)) {
    return assign({}, state, {
      referpage: '/',
    });
  }
  if (!referpage.startsWith(excludePath)) {
    return assign({}, state, {
      referpage,
    });
  }
  return state;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return recordReferPage(action.payload.pathname, state);
    case types.LOGIN:
      return assign({}, state, {
        open: true,
      });
    case types.LOGIN_RESULT:
      Cookies.set('TOKEN', action.data.token, { expires: 30 });
      Cookies.set('SIGN', action.data.sign, { expires: 30 });
      return assign({}, state, {
        token: action.data.token,
        sign: action.data.sign,
        roleType: action.data.roleType,
      });
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
