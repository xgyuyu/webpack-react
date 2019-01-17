import {take, fork, put, call, takeEvery} from 'redux-saga/effects'
import { getDataSaga } from '../components/home/saga'
import { loginSaga } from '../components/login/saga'

export function* watchAll() {
  // take函数可以理解为监听未来的action，它创建了一个命令对象，告诉middleware等待一个特定的action
  /* const action1 = yield take('LOGIN')
  console.log(action1)
  let res = yield call(fetchData, '/login', {
    method:'POST',
    body:JSON.stringify({
      username:action1.param.username,
      password:action1.param.password
    })
  })
  console.log(res) */

  yield fork(loginSaga)
  // 成功后
  yield fork(getDataSaga)

}