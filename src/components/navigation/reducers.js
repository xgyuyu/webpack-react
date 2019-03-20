/**
 * Created by yeyangmei on 16/9/13.
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import assign from 'object-assign';

const menus = [
  {
    name: '菜单',
    key: 'menu',
    icon: 'bars',
    children: [
      /* {
        link: '/menus',
        name: '菜单列表',
        crubName: '菜单',
        nav: true,
      }, */
      {
        link: '/menus/add',
        name: '添加菜单',
        crubName: '添加',
        nav: false,
      },
      {
        link: '/menus/edit',
        name: '编辑菜单',
        crubName: '编辑',
        nav: false,
      },
    ],
  },
  {
    name: '用户管理',
    nav: true,
    permission: 1,
    key: 'user',
    icon: 'user',
    children: [
      {
        link: '/user/myAccount',
        name: '用户',
        crubName: '用户',
        nav: false,
      },
      {
        link: '/user/userManagement',
        name: '用户列表',
        nav: true,
        permission: 1,
      },
      {
        link: '/user/userManagement/add',
        name: '添加用户',
        nav: true,
        permission: 1,
      },
    ],
  },
];

const linkList = menus.reduce((concated, { children }) => (
  concated.concat(children)), []);
const defaultState = {
  current: '/',
  load: false,
  menus,
  linkList,
  expandable: 'expand',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        current: action.payload.pathname,
      });
    case 'nav_init_user_info_res':
      return assign({}, state, {
        load: true,
      });
    case 'nav_expand':
      return assign({}, state, {
        expandable: action.value,
      });
    default:
      return state;
  }
};
