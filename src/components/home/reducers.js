import { GET_STU_DATA, SET_STU_DATA, VIEW_DETAIL, ISVISIBLE, DATE } from './types'
import assign from 'object-assign'

let defaultData = {
  list: [],
  detail: {},
  isVisible: false,
  date: ''
}

export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_STU_DATA:
    return state
    case SET_STU_DATA:
    return assign({}, state, {
      list: action.list
    })
    case VIEW_DETAIL:
    return assign({}, state, {
      detail: action.param
    })
    case ISVISIBLE:
    return assign({}, state, {
      isVisible: action.param
    })
    case DATE:
    default:
    return state
  }
}
