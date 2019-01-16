import { GET_STU_DATA, SET_STU_DATA } from './types'
import assign from 'object-assign'

let defaultData = {
  list: []
}

export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_STU_DATA:
    return state
    case SET_STU_DATA:
    return assign({}, state, {
      // list: action.value,
    })
    default:
    return state
  }
}
