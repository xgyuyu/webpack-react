import { put, fork, takeLatest, take, call } from 'redux-saga/effects'
import * as types from './types'
import { history } from '../../common/history'
import fetchData from '../../common/index'
import { getData } from '../home/saga'

function* login(action) {
  console.log(action)
  const res = yield call(fetchData, '/login', {
    method:'POST',
    body:JSON.stringify({
      username:action.param.username,
      password:action.param.password
    })
  })
  console.log(res)
  history.push('#/home')
  // huozheyongif
  // 登陆成功后调用
  yield fork(getData)
}

export function* loginSaga() {
  yield takeLatest(types.LOGIN, login)
}