/*
  定义接口方法
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

// 给get方法拼接参数
export function getUrl(url, params) {
  if (params) {
    let paramsArray = []
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }
  }
  return url
}

export async function fetchData(url, configObj){
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
