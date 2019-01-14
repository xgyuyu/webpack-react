import { ADD_TODO, TOGGLE_TODO } from '../constants/todo'

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ]
    case TOGGLE_TODO:
    return [
      state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            complete: !todo.completed
          }
        } else {
          return todo
        }
      })
    ]
    default:
    return state
  }
}

export todos