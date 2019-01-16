import { put, fork, takeLatest, take } from 'redux-saga/effects'
import { getstuList } from './apiServer'
import { GET_STU_DATA, SET_STU_DATA } from './types'

function* getData(action) {
  console.log(action)
  const res = yield getstuList(action)
  console.log(res)
  yield put({ type: SET_STU_DATA, res })
}

export function* getstudata() {
  yield takeLatest(GET_STU_DATA, getData)
}
