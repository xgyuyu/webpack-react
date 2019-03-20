import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  configAllData: [],
  websites: [],
  release: false,
  menuNameAutoCompelete: [],
  visible: false,
  editTitle: '',
  websiteState: 1,
  currentPage: 1,
  site: '',
  searching: false,
  menuName: '',
  menuStatus: '',
  sitesGroup: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.LOADED_WEBSITE:
      return assign({}, state, {
        websites: action.data,
        websiteState: 2,
      });
    case TYPES.SHOW_CONFIG_ALL:
      return assign({}, state, {
        menuName: null,
        tableLoad: true,
        searching: false,
      });
    case TYPES.LOAD_CONFIG_ALL_NAMES:
      return assign({}, state, {
        originalNames: action.data.list.map(item => item.menu_name),
      });
    case TYPES.LOAD_CONFIG_ALL:
      return assign({}, state, {
        configAllData: action.data.list,
        total: parseInt(action.data.total, 10),
        tableLoad: false,
        dataLoading: false,
        originalNames: action.data.list.map(item => item.menu_name),
      });
    case TYPES.SEARCH:
      return assign({}, state, {
        tableLoad: true,
        searching: true,
      });
    case TYPES.SEARCH_RESULT:
      return assign({}, state, {
        configAllData: action.data.list,
        total: parseInt(action.data.total, 10),
        tableLoad: false,
        dataLoading: false,
        originalNames: action.data.list.map(item => item.menu_name),
      });
    case TYPES.CLEAR_SEARCH_PARAMS:
      return assign({}, state, {
        site: '',
        menuName: '',
        menuStatus: '',
      });
    case TYPES.EDIT_CONDIG_MENU_STATUS:
      return assign({}, state, {
        configAllData: [
          ...state.configAllData
            .slice(0, state.configAllData.findIndex(item => item.menu_id === action.param.menu_id)),
          assign(
            {}, state.configAllData.find(item => item.menu_id === action.param.menu_id),
            {
              dataLoading: true,
            },
          ),
          ...state.configAllData
            .slice(state.configAllData.findIndex(item => item.menu_id === action.param.menu_id) + 1),
        ],
        tableLoad: true,
      });
    case TYPES.EDIT_CONDIG_MENU_STATUS_RESULT:
      return assign({}, state, {
        configAllData: [
          ...state.configAllData
            .slice(0, state.configAllData.findIndex(item => item.menu_id === action.id)),
          assign(
            {}, state.configAllData.find(item => item.menu_id === action.id),
            {
              menu_status: action.status,
              dataLoading: false,
            },
          ),
          ...state.configAllData
            .slice(state.configAllData.findIndex(item => item.menu_id === action.id) + 1),
        ],
        tableLoad: false,
      });
    case TYPES.INIT_MENU_NAME:
      return assign({}, state, {
        editTitle: action.value,
        editId: action.editId,
      });
    case TYPES.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
