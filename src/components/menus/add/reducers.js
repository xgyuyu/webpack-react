import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  load: false,
  dataSource: [],
  diyLink: '',
  menuDetails: { position_id: '' },
  imageMsgs: [{}],
  category_recommend_imgs: [{ imgs: [] }],
  cateLink: '',
  cateVirId: '',
  items: {},
  beforeDiyLink: 'http://',
  urls: ['http://', 'http://'],
  selected: [],
  specialSour: [],
  diyAppSpecial: {
    key: '',
    name: '',
  },
  forbid: [2026, 2030, 2035, 2031, 2032, 905, 909, 914, 910, 911, 2026, 2030, 2035, 2031, 2032, 2131, 2135, 2140, 2136, 2137],
};
// recurve 值为0时表示newProps不传递给子，id和自身id匹配时给自己
// revurve 值为1时表示newProps在id和自身id匹配时传递给子和自己
// recureve 值为2是表示newProps始终传递给子和自己
function replaceTreeItemProps(arr, id, newPropsFactory, recurve, idName = 'category_id') {
  return arr.map((item) => {
    if (recurve === 2 || item[idName] === id) {
      if (recurve) {
        return assign({}, item, newPropsFactory(item), {
          category_children: item.category_children ?
            replaceTreeItemProps(item.category_children, id, newPropsFactory, 2, idName) : [],
        });
      }
      return assign({}, item, newPropsFactory(item));
    }
    return assign({}, item, {
      category_children: item.category_children ?
        replaceTreeItemProps(item.category_children, id, newPropsFactory, recurve, idName) : [],
    });
  });
}
function filterChecked(arr = [], id) {
  return arr.reduce((sum, item) => {
    if (item.id === id) {
      return [...sum];
    }
    return [...sum, assign({}, item, {
      category_children: filterChecked(item.category_children, id),
    })];
  }, []);
}
function categoryRecommendImgs(source, action) {
  const {
    index, key, val, imgsIndex,
  } = action;
  const info = source[index];
  const positions = [
    { value: '1', name: '单图', num: 1 },
    { value: '2', name: '双图（上下双图）', num: 2 },
    { value: '3', name: '四图（等比四图）', num: 4 },
    { value: '4', name: '四图（交错四图）', num: 4 },
  ];
  const {
    imgs,
  } = info;
  let result = {};
  if (key === 'layoutType') {
    result = {
      layoutType: val,
      imgs: Array(positions.find(v => v.value === val).num).fill({}),
      alt2: val == 2 || val == 3 ? '' : info.alt2,
      alt: val == 2 || val == 3 ? '' : info.alt,
    };
  } else if (key === 'imgs') {
    result = { imgs: imgs.map((v, j) => (imgsIndex === j ? assign({}, v, val) : v)) };
  } else {
    result = { [key]: val };
  }
  const res = assign({}, info, result);
  return source.map((v, i) => (i === index ? res : v));
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.LOADED_CATEGORYS:
      return assign({}, state, {
        dataSource: action.data,
        load: true,
      });
    case TYPES.LOADED_CATEGORYS_DETAILS:
      return assign({}, state, {
        menuDetails: action.data,
        loadDetails: true,
      });
    case TYPES.INIT_NEW_MENU:
      return assign({}, state, {
        menuDetails: {
          menu_id: action.menuId,
          menu_name: action.menuName,
          menu_status: '1',
          site_uid: action.siteUid,
          category_children: [],
        },
        loadDetails: true,
      });
    case TYPES.COPY_MENU:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          menu_id: action.menuId,
          menu_status: '1',
          menu_name: action.menuName,
        }),
        loadDetails: true,
      });
    case TYPES.TOGGLE_SELECTED_ITEM:
      return assign({}, state, {
        dataSource: replaceTreeItemProps(state.dataSource, action.id, () => ({
          checked: action.value,
        }), 1),
      });
    case TYPES.ADD_NORMAL_CATERGORY:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            ...action.value,
          ],
        }),
        dataSource: replaceTreeItemProps(state.dataSource, null, () => ({
          checked: false,
        }), 2),
        selected: [],
      });
    case TYPES.INIT_CATEGORY_EDIT_DATA:
      return assign({}, state, {
        nameValue: action.data.category_title,
        color: action.data.category_color,
        bold: action.data.bold,
        cateLink: action.data.category_link,
        cateVirId: action.data.category_virtual_id,
        rec_content: action.data.rec_content,
        productSelectUrlId: action.data.product_select_url_id,
        imageMsgs: (action.data.category_image && action.data.category_image.length) ?
          action.data.category_image :
          defaultState.imageMsgs,
        category_recommend_imgs: (action.data.category_recommend_imgs && action.data.category_recommend_imgs.length) ?
          action.data.category_recommend_imgs :
          defaultState.category_recommend_imgs,
        daily_new_cat: Array.isArray(action.data.daily_new_cat) ? action.data.daily_new_cat.join(',') : action.data.daily_new_cat,
      });
    case TYPES.CATE_IMG_UPLOAD:
      return assign({}, state, {
        imgloading: true,
      });
    case TYPES.CATE_IMG_UPLOAD_RESULT:
      return assign({}, state, {
        imageMsgs: [
          ...state.imageMsgs.slice(0, action.index),
          assign({}, state.imageMsgs[action.index], {
            width: action.data.width,
            height: action.data.height,
            target: action.data.img_url,
          }),
          ...state.imageMsgs.slice(action.index + 1),
        ],
        imgloading: false,
      });
    case TYPES.IMG_MSG_CHANGE:
      return Object.assign({}, state, {
        imageMsgs: [
          ...state.imageMsgs.slice(0, action.index),
          Object.assign({}, state.imageMsgs[action.index], {
            [action.key]: action.value,
          }),
          ...state.imageMsgs.slice(action.index + 1),
        ],
      });
    case TYPES.EDIT_EVERY_CATE:
      return assign({}, state, {
        menuDetails: assign(
          {},
          state.menuDetails,
          {
            category_children: replaceTreeItemProps(
              state.menuDetails.category_children,
              action.id, () => (action.data), 0, 'id',
            ),
          },
        ),
      });
    case TYPES.DEL_EVERY_CATE:
      return assign({}, state, {
        menuDetails: assign(
          {},
          state.menuDetails,
          {
            category_children: filterChecked(
              state.menuDetails.category_children,
              action.id,
            ),
          },
        ),
      });
    case TYPES.GEN_DETAILS_DATA:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: action.value,
        }),
      });
    case TYPES.CATEGORYS_DETAILS_SAVE:
      return assign({}, state, {
        saveLoad: true,
        detailLoad: true,
      });
    case TYPES.CATEGORYS_DETAILS_SAVE_RESULT:
      return assign({}, state, {
        saveLoad: false,
        detailLoad: false,
      });
    case TYPES.ADD_DIY_LINK:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 2,
              category_title: action.name,
              category_raw_title: action.name,
              category_link: action.url,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.addProductSelect:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 9,
              category_title: action.name,
              category_raw_title: action.name,
              product_select_url_id: action.url,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.ADD_SPLIT_TITLE:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_title: '标题',
              category_raw_title: '标题',
              category_type: 8,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.addTopCate:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_title: '顶部标题',
              category_raw_title: '顶部标题',
              category_type: 10,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.ADD_DIY_APP:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 4,
              category_title: action.name,
              category_raw_title: action.name,
              category_virtual_id: action.url,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.ADD_DIY_SPECIAL_APP:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 5,
              category_title: action.name,
              category_raw_title: action.name,
              category_special_key: action.key,
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.ADD_DALIYNEW:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 3,
              category_title: 'What\'s New',
              category_raw_title: 'What\'s New',
              category_color: '#000000',
            },
          ],
        }),
      });
    case TYPES.ADD_NEXT_LINE:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_title: '跳行栏',
              category_type: 6,
            },
          ],
        }),
      });
    case TYPES.addSplitLine:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_title: '隔断竖线',
              category_type: 11,
            },
          ],
        }),
      });
    case TYPES.ADD_BANNER_LINE:
      return assign({}, state, {
        menuDetails: assign({}, state.menuDetails, {
          category_children: [
            ...state.menuDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_title: 'Banner图',
              category_type: 7,
            },
          ],
        }),
      });
    case TYPES.IMG_URL_BEFORE:
      return assign({}, state, {
        urls: [...state.urls.slice(0, action.index),
          action.value,
          ...state.urls.slice(action.index + 1),
        ],
      });
    case TYPES.ADD_IMAGE_ENTRY:
      return assign({}, state, {
        imageMsgs: [
          ...state.imageMsgs, {},
        ],
        urls: [
          ...state.urls, 'http://',
        ],
      });
    case TYPES.addImageEntryNew:
      return assign({}, state, {
        category_recommend_imgs: [
          ...state.category_recommend_imgs, { imgs: [] },
        ],
      });
    case TYPES.GET_DIY_SPECIAL_APP_SUCCESS:
      return assign({}, state, {
        specialSour: action.data,
      });
    case TYPES.recommendImgChanage:
      return assign({}, state, {
        category_recommend_imgs: categoryRecommendImgs(state.category_recommend_imgs, action),
      });
    case TYPES.SUBMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case TYPES.PREVIEW_IMG_INFO:
      return assign({}, state, {
        preViewVisible: true,
        preViewData: action.data,
      });
    default:
      return state;
  }
};
