import * as types from './types'

let defaultLogin = {
  Username: '',
  Password: ''
}

const counter = (state = defaultLogin, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return state
    default: return state
  }
}

export default counter