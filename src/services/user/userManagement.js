import fetch from '../../lib/fetch';

export function userInfo() {
  const url = `${process.env.BASE_URI}user/info`;
  return fetch(url, {
    method: 'get',
  });
}

export function showUsers() {
  const url = `${process.env.BASE_URI}user/list`;
  return fetch(url, {
    method: 'get',
  });
}
export function addUser(action) {
  const url = `${process.env.BASE_URI}user/create`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(action.params),
  });
}
export function delUser(userId) {
  const url = `${process.env.BASE_URI}user/del/${userId}`;
  return fetch(url, {
    method: 'put',
    body: JSON.stringify({ userId }),
  });
}
export function updateUser(action) {
  const url = `${process.env.BASE_URI}user/info/${action.params.userId}`;
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(action.params),
  });
}
