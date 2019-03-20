import { put, takeLatest } from 'redux-saga/effects';
import {
  showConfigAll, showWebsite, editConfigMenuStatus, searchConfig, releaseConfigMenu,
  getSitegroupSer,
} from '../../../services/menus/menus';
import * as listTypes from './types';
import changeValue from './action';

function* loadWebsites() {
  const websites = yield showWebsite();
  yield put({ type: listTypes.LOADED_WEBSITE, data: websites });
}

function* loadConfigData(action) {
  const configsData = yield showConfigAll(action.data);
  if (action.type === listTypes.INIT) {
    yield put({ type: listTypes.LOAD_CONFIG_ALL_NAMES, data: configsData });
  }
  yield put({ type: listTypes.LOAD_CONFIG_ALL, data: configsData });
}
function* searchConfigData(action) {
  const res = yield searchConfig(action);
  yield put({ type: listTypes.SEARCH_RESULT, data: res });
}
function* editMenuStatus(action) {
  let res;
  if (action.param.release) {
    res = yield releaseConfigMenu(action);
  } else {
    res = yield editConfigMenuStatus(action);
  }
  yield put({
    type: listTypes.EDIT_CONDIG_MENU_STATUS_RESULT,
    data: res,
    id: action.param.menu_id,
    status: action.param.menu_status,
  });
  if (action.param.searching) {
    yield put({ type: listTypes.SEARCH, param: action.param.searchParams });
  } else {
    yield put({ type: listTypes.SHOW_CONFIG_ALL, data: action.param.currentPage });
  }
}
function* getSitegroupSaga(action) {
  const websites = yield getSitegroupSer(action.id);
  yield put(changeValue('sitesGroup', websites));
}
export default function* menuListSaga() {
  yield takeLatest(listTypes.INIT, loadConfigData);

  yield takeLatest(listTypes.SHOW_WEBSITE, loadWebsites);

  yield takeLatest(listTypes.SEARCH, searchConfigData);

  yield takeLatest(listTypes.SHOW_CONFIG_ALL, loadConfigData);

  yield takeLatest(listTypes.EDIT_CONDIG_MENU_STATUS, editMenuStatus);

  yield takeLatest(listTypes.GET_SITE_GROUP, getSitegroupSaga);
}
