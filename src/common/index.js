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

export default async function fetchData(url, configObj){
  let Url = baseUrl + url
  const res = await fetch(Url, Object.assign(configObj)).then(function(res){
    return res
  }).catch(function(err){
    console.log(err)
    showMessage(err)
    return err
  })
  return res.json()
}
