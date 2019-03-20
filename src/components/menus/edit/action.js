import * as types from './types';

export function init() {
  return {
    type: types.INIT,
  };
}
export function commit(key, value) {
  return {
    type: types.SUBMIT,
    key,
    value,
  };
}
export function initCateEditData(value) {
  return {
    type: types.INIT_CATEGORY_EDIT_DATA,
    data: value,
  };
}
export function msgDataChange(index, key, value) {
  return {
    type: types.IMG_MSG_CHANGE,
    index,
    key,
    value,
  };
}
export function fetchParams(typeCode, args) {
  return {
    type: typeCode,
    param: args,
  };
}
export function genCateDetailData(value) {
  return {
    type: types.GEN_DETAILS_DATA,
    value,
  };
}
export function addNomalCate(value) {
  return {
    type: types.ADD_NORMAL_CATERGORY,
    value,
  };
}
export function toggleChecked(id, value) {
  return {
    type: types.TOGGLE_SELECTED_ITEM,
    id,
    value,
  };
}
export function addDiyLink(diyurl, diyname) {
  return {
    type: types.ADD_DIY_LINK,
    url: diyurl,
    name: diyname,
  };
}
export function newMenu(siteUid, menuId, menuName) {
  return {
    type: types.INIT_NEW_MENU,
    siteUid,
    menuId,
    menuName,
  };
}
export function imgUrlbefore(index, value) {
  return {
    type: types.IMG_URL_BEFORE,
    index,
    value,
  };
}

export function copyMenu(menuId, menuName) {
  return {
    type: types.COPY_MENU,
    menuId,
    menuName,
  };
}
export function addImageEntry() {
  return {
    type: types.ADD_IMAGE_ENTRY,
  };
}
export function addImageEntryNew() {
  return {
    type: types.addImageEntryNew,
  };
}

export function addDiyApp(diyId, diynameApp) {
  return {
    type: types.ADD_DIY_APP,
    url: diyId,
    name: diynameApp,
  };
}

export function addDiySpecialApp(key, name) {
  return {
    type: types.ADD_DIY_SPECIAL_APP,
    key,
    name,
  };
}
export function addProductSelect(diyId, diynameApp) {
  return {
    type: types.addProductSelect,
    url: diyId,
    name: diynameApp,
  };
}
export const recommendImgChanage = (index, key, val, imgsIndex, imgsKey) => ({
  type: types.recommendImgChanage, key, val, imgsIndex, imgsKey, index,
});
