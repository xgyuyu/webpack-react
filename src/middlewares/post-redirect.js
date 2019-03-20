import { push } from 'react-router-redux';
import { Modal } from 'antd';

export const POST_REDIRECT = Symbol('post');

export const postRedirect = (status, target, modalTime = 5000) => ({
  type: POST_REDIRECT,
  status,
  target,
  modalTime
});

export default ({ dispatch }) => next => (action) => {
  if (action.type === POST_REDIRECT) {
    const { status, target, noRedirect, modalTime = 5000, cb = () => {} } = action;
    let modalAlive = true;
    if (status === 200) {
      const modal = Modal.success({
        title: '操作成功',
        onOk() {
          modalAlive = false;
          if (!noRedirect) {
            dispatch(push(target));
          }
          setTimeout(() => {
            cb();
          }, 500);
        }
      });
      setTimeout(() => {
        if (modalAlive) {
          modal.destroy();
          if (!noRedirect) {
            dispatch(push(target));
          }
          setTimeout(() => {
            cb();
          }, 500);
        }
      }, modalTime);
    } else {
      const modal = Modal.error({
        title: '操作失败',
        onOk() {
          modalAlive = false;
          setTimeout(() => {
            cb();
          }, 500);
        }
      });
      setTimeout(() => {
        if (modalAlive) {
          modal.destroy();
          setTimeout(() => {
            cb();
          }, 500);
        }
      }, modalTime);
    }
  }
  return next(action);
};
