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

export function Fetch(obj, option) {
  let url = baseUrl + obj.url
  let options = Object.assign(obj.method, option)
  console.log(options)
  fetch(url, options)
  .then(res => {
    let { status } = res
    if (status !== 200) {
      throw new Error(status)
    }
    return res.json()
  })
  .then(json => {
    const error = json.code
    if (error !== 0) {
      showMessage(decodeURIComponent(json.msg))
      throw new Error(json.msg)
    }
    return json.info
  })
}