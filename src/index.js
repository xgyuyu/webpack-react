import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// 引用redux
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger' // 利用redux-logger打印日志

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import createBrowserHistory from "history/createHashHistory";


const history = createBrowserHistory()

import App from './components/App'
import Login from './components/login/Login'
import { watchIncrementAsync } from './sagas'
import './css/index.css'
import './css/index.less'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, createLogger)
  )
)

sagaMiddleware.run(watchIncrementAsync)

// const history = syncHistoryWithStore(createBrowserHistory(), store)
// history.listen(location => analyticsService.track(location.pathname))

const Div = props => (
  <Provider store={ store }>
    <HashRouter  history={history}>
    <div>
      <Switch>
        <Route  path="/" component={App}/>
        <Route  path="/login" component={Login}/>
      </Switch>
      </div>
    </HashRouter>
  </Provider>
)

ReactDOM.render(
  <Div />, document.getElementById('app'),
)

