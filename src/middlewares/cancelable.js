import { message } from 'antd';
import { get as getCurrent, setCallback } from 'rrc-loader-helper/lib/current-page';

const stateStack = [];
const restoreStack = [];
const RESTORE = 'restore';
const CANCEL = 'cancel';

export const restore = () => ({
  type: RESTORE,
});

export const cacel = () => ({
  type: CANCEL,
});

setCallback(() => {
  stateStack.length = 0;
  restoreStack.length = 0;
});

export default (reducer, page) => (state, action) => {
  if (getCurrent() === page) {
    if (action.type === CANCEL) {
      const currentState = stateStack.pop();
      if (!currentState) return state;
      restoreStack.push(currentState);
      message.success('已返回至上一步操作');
      return currentState;
    } else if (action.type === RESTORE) {
      const currentState = restoreStack.pop();
      if (!currentState) return state;
      stateStack.push(currentState);
      return currentState;
    } else if (action.type.indexOf('_STACK') > -1) {
      stateStack.push(state);
    } else {
      stateStack.length = 0;
    }
  }
  return reducer(state, action);
};
