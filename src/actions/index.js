import { TOGGLE_TODO, ADD_TODO, SET_VISIBILITY_FILTER, SHOW_ALL } from '../constants/todo'

let nextTodo = 0

export const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodo++,
  text
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
})

export const setVisibilityFilter = (filter) =>({
  type: SET_VISIBILITY_FILTER,
  filter
})