import { combineReducers } from 'redux'
import login from '../components/login/reducers'
import home from '../components/home/reducers'

// import { routerReducer } from 'react-router-redux'
export default combineReducers({
    login,
    home
})