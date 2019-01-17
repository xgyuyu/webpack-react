import { put, fork, takeLatest, take, call } from 'redux-saga/effects'
import { GET_STU_DATA, SET_STU_DATA, VIEW_DETAIL, ISVISIBLE } from './types'
import { fetchData, getUrl} from '../../common/index'

function* getstuData() {
  const res = yield call(fetchData, '/studentsList', { method: 'get' })
  yield put({type: SET_STU_DATA, list: res.list})
}

function* viewDetail(action) {
  let url = getUrl('/students/', action.param)
  const res = yield call(fetchData, url, { method: 'get' })
  if (res.code == 0) {
    yield put({type: ISVISIBLE, param: true})
  }
}

export function* getDataSaga() {
  yield takeLatest(GET_STU_DATA, getstuData)
  yield takeLatest(VIEW_DETAIL, viewDetail)
}

