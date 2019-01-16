import { LOGIN, CHANGE_PASSWORD, CHANGE_USERNAME } from './types'

export const changeUsername = (value) => {
    return {
        type: CHANGE_USERNAME,
        value
    }
}

export const changePassword = (value) => {
  return {
      type: CHANGE_PASSWORD,
      value
  }
}

export const login = (username, password) => {
    return {
        type: LOGIN,
        param: {
          username,
          password
        }
    }
}