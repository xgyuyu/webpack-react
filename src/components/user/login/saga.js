import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import login from '../../../services/user/login';
import { loginResult } from './action';
import * as types from './types';
import { setPermission } from '../../../lib/permission';

function* userLogin(action) {
  const res = yield login(action);
  setPermission(res.roleType);
  yield put(loginResult(res));
  const bodyStyle = document.getElementsByTagName('body')[0].style;
  bodyStyle.overflow = 'visible';
  yield put(push(action.param.referpage));
}

export default function* loginSaga() {
  yield takeLatest(types.LOGIN, userLogin);
}
