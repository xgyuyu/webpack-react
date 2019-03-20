import fetch from '../../lib/fetch';

export function updatePassward(action) {
  const url = `${process.env.BASE_URI}user/info/${action.userId}`;
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(action),
  });
}
export function logout() {
  const url = `${process.env.BASE_URI}user/logout`;
  return fetch(url, {
    method: 'post',
  });
}

