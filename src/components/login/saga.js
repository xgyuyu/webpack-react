import { put, fork, takeLatest, take } from 'redux-saga/effects'
import * as types from './types'
import { history } from '../../common/history'
import { loginsend } from './apiServer'

function* login(action) {
  const res = yield loginsend(action)
  console.log(res)
  history.push('#/home')
  // window.location.reload()
}

export function* loginSage() {
  yield takeLatest(types.LOGIN, login)
}