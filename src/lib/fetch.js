/**
 * Created by xuliuzhu on 16/9/5.
 */
/**
 * Created by fed on 16/8/2.
 */
import { notification } from 'antd';
import Cookies from 'js-cookie';

let fetch;
if (process.env.NODE_ENV === 'test') {
  fetch = global.fetch;
} else {
  fetch = window.fetch;
}

let messageShowed = false;

function showMessage(msg, fn = () => {}) {
  if (!messageShowed) {
    messageShowed = true;
    notification.open({
      message: '提醒',
      description: msg,
    });
    setTimeout(() => {
      messageShowed = false;
      fn();
    }, 3000);
  }
}

export default (url, args = {}) => (
  fetch(url, Object.assign({
    credentials: 'include',
    headers: {
      TOKEN: Cookies.get('TOKEN'),
      SIGN: Cookies.get('SIGN'),
    },
  }, args)))
  .then((res) => {
    const { status } = res;
    if (status !== 200) {
      showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
      throw new Error(status);
    }
    return res.json();
  })
  .then((json) => {
    const error = json.code;
    if (error !== 0) {
      showMessage(decodeURIComponent(json.msg));
      throw new Error(json.msg);
    }
    return json.info;
  });
