import { SET_STU_DATA } from './types'
import assign from 'object-assign'

let defaultData = {
  list: []
}

export default (state = defaultData, action) => {
  switch (action.type) {
    case SET_STU_DATA:
    return assign({}, state, {
      list: action.list
    })
    default:
    return state
  }
}
