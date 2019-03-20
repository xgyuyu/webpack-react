import * as types from './types';

const changeValue = (key, value) => (
  {
    type: types.CHANGE_VALUE,
    key,
    value,
  }
);

export const searchMenus = (site, menuPosition, menuName, menuStatus) => (
  {
    type: types.SEARCH,
    site,
    menuPosition,
    menuName,
    menuStatus,
  }
);
export function showConfigAll(page) {
  return {
    type: types.SHOW_CONFIG_ALL,
    data: page,
  };
}
export function fetchParams(typeCode, args) {
  return {
    type: typeCode,
    param: args,
  };
}
export function getSitegroup(id) {
  return {
    type: types.GET_SITE_GROUP,
    id,
  };
}

export default changeValue;
