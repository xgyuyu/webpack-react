import fetch from '../../lib/fetch';

export default (action) => {
  const url = `${process.env.BASE_URI}user/login`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(action.param),
  });
};
