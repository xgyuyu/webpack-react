import { put, takeLatest } from 'redux-saga/effects';
import { userInfo } from '../../services/user/userManagement';
import { setPermission } from '../../lib/permission';
import { setUserInfo } from '../../lib/userInfo';

function* loadMyAccount() {
  const res = yield userInfo();
  setPermission(parseInt(res.roleType, 10));
  setUserInfo(res);
  yield put({ type: 'nav_init_user_info_res' });
}

export default function* navSagas() {
  yield takeLatest('nav_init_user_info', loadMyAccount);
}
