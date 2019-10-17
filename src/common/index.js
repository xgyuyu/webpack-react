/*
  定义接口方法
*/
import { notification } from 'antd'
import createHistory from 'history/createHashHistory'
let history = createHistory()
const baseUrl = ''
//http://api-doc.dotfashion.cn/mock/776/api

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

// async
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

// 路由跳转
export function routerPush(url) {
  history.push(url)
}

// 检查是否登陆
export function checkLogin() {
  if (localStorage.getItem('username') === '' || localStorage.getItem('username') == null || localStorage.getItem('username') == undefined) {
    routerPush('/login')
  }
}
