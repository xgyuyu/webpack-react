import { SET_STU_DATA } from './types'

export const setstudata = (action) => {
  return {
      type: SET_STU_DATA,
      param: action
  }
}