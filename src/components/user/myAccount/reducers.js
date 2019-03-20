import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  load: false,
  updatePaswdVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'nav_init_user_info':
      return assign({}, state, {
        load: false,
      });
    case 'nav_init_user_info_res':
      return assign({}, state, {
        load: true,
      });
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
