import fetch from '../../lib/fetch';
// get
export function showWebsite() {
  const url = `${process.env.BASE_URI}site/list`;
  return fetch(url, {
    method: 'get',
  });
}
export function showConfigAll(page) {
  const url = `${process.env.BASE_URI}menu/list?p=${page}`;
  return fetch(url, {
    method: 'get',
  });
}
export function showFilterConfigAll(siteUid) {
  const url = `${process.env.BASE_URI}site?site_uid=${encodeURI(siteUid)}`;
  return fetch(url, {
    method: 'get',
  });
}
export function showSourceData(siteUid) {
  const url = `${process.env.BASE_URI}nav/categorys?site_uid=${encodeURI(siteUid)}`;
  return fetch(url, {
    method: 'get',
  });
}
export function searchConfig(action) {
  const url = `${process.env.BASE_URI}menu/search`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(action.param),
  });
}
export function showMenuDetails(menuId) {
  const url = `${process.env.BASE_URI}nav/menu?id=${encodeURI(menuId)}`;
  return fetch(url, {
    method: 'get',
  });
}
export function editConfigMenuStatus(action) {
  const url = `${process.env.BASE_URI}nav/menus/${encodeURI(action.param.menu_id)}`;
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(action.param),
  });
}
export function releaseConfigMenu(action) {
  const url = `${process.env.BASE_URI}nav/publish/${encodeURI(action.param.menu_id)}`;
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(action.param),
  });
}
export function imgUpload(action) {
  const url = `${process.env.BASE_URI}nav/category/imageupload`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(action.param),
  });
}

export function getSpecialApp(siteUid) {
  return fetch(`${process.env.BASE_URI}category/specialcategory?site_uid=${encodeURI(siteUid)}`, {
    method: 'get',
  });
}
export function newCopySer(menuId, toSiteUid) {
  return fetch(`${process.env.BASE_URI}menu/copymenu`, {
    method: 'post',
    body: JSON.stringify({ from_menu_id: menuId, to_site_uid: toSiteUid }),
  });
}


export function categorysDetailsSave(action) {
  let url = '';
  let method = {};
  if (action.param.menu_id.indexOf('temp') > -1) {
    url = `${process.env.BASE_URI}nav/menu`;
    method = { method: 'post' };
  } else {
    url = `${process.env.BASE_URI}nav/menu/${encodeURI(action.param.menu_id)}`;
    method = { method: 'put' };
  }
  return fetch(url, {
    method: method.method,
    body: JSON.stringify(action.param),
  });
}

export function getSitegroupSer(id) {
  const url = `${process.env.BASE_URI}menu/sitegroup`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({ site_uid: id }),
  });
}
export function getDaliyCateSer(id) {
  const url = `${process.env.BASE_URI}site/dailycat?site_uid=${id}`;
  return fetch(url, {
    method: 'get',
  });
}
