import { put, fork, takeLatest, take, call } from 'redux-saga/effects'
import history from '../../common/history'
import { fetchData } from '../../common/index'
import { LOGIN, LOGINOUT } from './types'

function* login(action) {
  const res = yield call(fetchData, '/login', {
    method:'POST',
    body:JSON.stringify({
      username:action.param.username,
      password:action.param.password
    })
  })
  console.log(res)
  // if(res.code) {}
  localStorage.setItem('username', '123')
  history.push('/home')
}

function* loginout() {
  const res = yield call(fetchData, '/loginout', { method:'get' })
  console.log(res)
  if (res.code == 0) {
    history.push('/login')
    localStorage.setItem('username', '')
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN, login)
  yield takeLatest(LOGINOUT, loginout)
}
