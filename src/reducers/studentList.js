import { INCREMENT } from '../constants/counter'

const counter = (state = [1], action = {}) => {
  switch (action.type) {
    case INCREMENT:
    console.log(state)
      return [
          ...state,
          1
      ]
    default: return state
  }
}

export default counter
