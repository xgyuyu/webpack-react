import { GET_STU_DATA, SET_STU_DATA } from './types'

export const getstudata = () => {
  return {
      type: GET_STU_DATA
  }
}

export const setstudata = (action) => {
  return {
      type: SET_STU_DATA,
      param: action
  }
}