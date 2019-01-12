import { combineReducers } from 'redux'
import users from './users'
import counter from './counter'

export default combineReducers({
    users,
    counter
})