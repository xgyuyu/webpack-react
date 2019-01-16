/*
  定义各种公共方法
*/
import { notification } from 'antd'
const baseUrl = 'http://api.dotfashion.cn:8115/mock/776/api'

let messageShowed = false
function showMessage(msg, fn = () => {}) {
  if (!messageShowed) {
    messageShowed = true
    notification.open({
      message: '提醒',
      description: msg,
    })
    setTimeout(() => {
      messageShowed = false
      fn()
    }, 3000)
  }
}

export function fetchData(url, type, options) {
  let Url = baseUrl + url
  fetch(Url, {
    method: type,
    body: JSON.stringify(options.param)
  })
  .then(res => {
    console.log(res)
    let { status } = res
    if (status !== 200) {
      throw new Error(status)
      // showMessage('您输入的账号或者密码有误')
    }
    // return JSON.parse(res.text())
    return eval(res.text())
  })
  .then(json => {
    json = JSON.parse(json)
    console.log(json)
    // if (json.code == 0) {
    return json
    // }
  })
}