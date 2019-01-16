import {take, all, fork, put, call} from 'redux-saga/effects'
import { loginSaga } from '../components/login/saga'

import { history } from '../common/history'
import fetchData from '../common/index'
import { getData } from '../components/home/saga'

export function* watchAll() {
  // console.log(login())
  // take函数可以理解为监听未来的action，它创建了一个命令对象，告诉middleware等待一个特定的action
  const action1=yield take('LOGIN')
  console.log(action1)
  let res = yield call(fetchData, '/login', {
    method:'POST',
    body:JSON.stringify({
      username:action1.param.username,
      password:action1.param.password
    })
  })
  console.log(res)
  // huozheyongif
  // 登陆成功后调用
  yield fork(getData)
  // history.push('#/home')

}