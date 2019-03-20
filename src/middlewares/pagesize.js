import jsCookie from 'js-cookie';

let pageSize = jsCookie.get('site[\'page_size\']') || '50';

const PAGE_SIZE_CHANGE = Symbol('page');

export const changeSize = size => ({
  type: PAGE_SIZE_CHANGE,
  size,
});

export const getSize = () => pageSize;

export default () => next => (action) => {
  if (action.type === PAGE_SIZE_CHANGE) {
    pageSize = action.size;
    jsCookie.set('site[\'page_size\']', action.size);
  }
  return next(action);
};
