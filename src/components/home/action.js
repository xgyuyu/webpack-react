import { GET_STU_DATA, SET_STU_DATA, VIEW_DETAIL, ISVISIBLE, DATE } from './types'

export const setstudata = (action) => {
  return {
      type: SET_STU_DATA,
      param: action
  }
}

export const getstudata = () => {
  return {
      type: GET_STU_DATA
  }
}

export const viewdetail = (params) => {
  return {
    type: VIEW_DETAIL,
    param: params
  }
}

export const isvisible = (params) => {
  return {
    type: ISVISIBLE,
    param: params
  }
}

export const date = () => {
  return {
    type: DATE
  }
}