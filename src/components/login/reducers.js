import { LOGIN, CHANGE_PASSWORD, CHANGE_USERNAME } from './types'
import assign from 'object-assign'

let defaultLogin = {
  username: 'admin',
  password: 'admin'
}

export default (state = defaultLogin, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
    return assign({}, state, {
      username: action.value,
    })
    case CHANGE_PASSWORD:
    return assign({}, state, {
      password: action.value,
    })
    case LOGIN:
    return state
    default: return state
  }
}

// export default login