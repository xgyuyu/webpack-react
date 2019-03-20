import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { changeValue } from '../login/action';
import * as types from './types';
import { setUserInfo } from '../../../lib/userInfo';
import { updatePassward, logout } from '../../../services/user/myAccount';

function* myLogOut() {
  yield logout();
  Cookies.remove('TOKEN');
  Cookies.remove('SIGN');
  setUserInfo({});
  yield put(changeValue('open', true));
  yield put(push('/user/login'));
}
function* editPaswd(action) {
  yield updatePassward(action);
  message.success('修改密码成功,请尝试重新登录');
  yield put({ type: types.LOG_OUT });
}

export default function* myAccountSaga() {
  yield takeLatest(types.CHANGE_PASWD, editPaswd);
  yield takeLatest(types.LOG_OUT, myLogOut);
}
