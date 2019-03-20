import { put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { copyMenu } from './action';
import {
  showSourceData, showMenuDetails, imgUpload, categorysDetailsSave, getSpecialApp,
  newCopySer, getDaliyCateSer,
} from '../../../services/menus/menus';
import * as types from './types';
import assign from "object-assign";

function* dataSource(action) {
  const res = yield showSourceData(action.siteUid);
  yield put({ type: types.LOADED_CATEGORYS, data: res });
}
function* menuDetails(action) {
  const res = yield showMenuDetails(action.menuId);
  yield put({ type: types.LOADED_CATEGORYS_DETAILS, data: res });
  if (action.tempId) {
    yield put(copyMenu(action.tempId, action.menuName));
  }
}
function* newCopy(action) {
  const res = yield newCopySer(action.menuId, action.toSiteUid);
  yield put({ type: types.LOADED_CATEGORYS_DETAILS, data: res });
  if (action.tempId) {
    yield put(copyMenu(action.tempId, action.menuName));
  }
}
function* imgUploadResult(action) {
  const res = yield imgUpload(action);
  yield put({ type: types.CATE_IMG_UPLOAD_RESULT, index: action.param.index, data: res });
  message.success('操作成功');
}
function* save(action) {
  const res = yield categorysDetailsSave(action);
  yield put({
    type: types.SHOW_CATEGORYS,
    siteUid: res.siteUid || action.param.site_uid,
    menuId: res.menuId || action.param.menu_id,
  });
  yield put({ type: types.CATEGORYS_DETAILS_SAVE_RESULT });
  message.success('操作成功');
  if (action.param.operate && action.param.operate === 'preview') {
    window.open(`${action.param.site_domain}/preview/${Number(action.param.position_id) === 5 ? 'menu2' : 'menu'}?menu_id=${action.param.menu_id}`);
  }
}

function* getSpecialAppSaga(action) {
  const res = yield getSpecialApp(action.siteUid);
  yield put({ type: types.GET_DIY_SPECIAL_APP_SUCCESS, data: res });
}
function* getDaliyCateSaga({ siteUid }) {
  const res = yield getDaliyCateSer(siteUid);
  yield put({ type: types.SUBMIT, key: 'dailyCate', value: (res || []).map(v => assign({}, v, { cat_ids: v.cat_ids.join(',') })) });
}
export default function* editMenuSaga() {
  yield takeLatest(types.SHOW_DATA_SOURCE, dataSource);

  yield takeLatest(types.SHOW_CATEGORYS, menuDetails);

  yield takeLatest(types.CATE_IMG_UPLOAD, imgUploadResult);

  yield takeLatest(types.CATEGORYS_DETAILS_SAVE, save);

  yield takeLatest(types.GET_DIY_SPECIAL_APP, getSpecialAppSaga);

  yield takeLatest(types.NEW_COPY_API, newCopy);
  yield takeLatest(types.getDaliyCate, getDaliyCateSaga);
}
