import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { showUsers, updateUser, addUser, delUser } from '../../../../services/user/userManagement';


function* loadUsersList() {
  const res = yield showUsers();
  yield put({ type: types.SHOW_USERS_LIST_RESULT, data: res });
}
function* editUser(action) {
  yield updateUser(action);
  yield put({ type: types.SHOW_USERS_LIST });
}

function* addUserInfo(action) {
  yield addUser(action);
  yield put({ type: types.ADD_USER_INFO_RESULT });
}

function* deleteUser(action) {
  yield delUser(action.userId);
  yield put({ type: types.SHOW_USERS_LIST });
}
export default function* userManagementSaga() {
  yield takeLatest(types.SHOW_USERS_LIST, loadUsersList);

  yield takeLatest(types.EDIT_USER_INFO, editUser);

  yield takeLatest(types.ADD_USER_INFO, addUserInfo);

  yield takeLatest(types.DELETE_USER, deleteUser);
}
