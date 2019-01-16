import { put, fork, takeLatest, take, call } from 'redux-saga/effects'
import { SET_STU_DATA } from './types'
import fetchData from '../../common/index'

export function* getData() {
  const res = yield call(fetchData, '/studentsList', { method: 'get' })
  console.log(res.list)
  yield put({type: SET_STU_DATA, list: res.list})
}

