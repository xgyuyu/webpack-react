import { put, fork, takeLatest, take, call } from 'redux-saga/effects'
import { GET_STU_DATA, SET_STU_DATA, VIEW_DETAIL, ISVISIBLE, DATE } from './types'
import { fetchData, getUrl} from '../../common/index'

function alt(time){
  alert(time)
}

function* getstuData() {
  const res = yield call(fetchData, '/studentsList', { method: 'get' })
  yield put({type: SET_STU_DATA, list: res.list})
}

function* viewDetail(action) {
  let url = getUrl('/students/', action.param)
  const res = yield call(fetchData, url, { method: 'get' })
  if (res.code == 0) {
    yield put({type: ISVISIBLE, param: true})
    // let newDate = new Date()
    // yield put({type: DATE, param: newDate})
  }
}

function* showTime(){
  let date = new Date()
  yield alt(date)
}

export function* getDataSaga() {
  yield takeLatest(GET_STU_DATA, getstuData)
  yield takeLatest(VIEW_DETAIL, viewDetail)
  yield takeLatest(DATE, showTime)
}

