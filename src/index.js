import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger' // 利用redux-logger打印日志
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import createBrowserHistory from "history/createHashHistory"
import App from './components/App'
import Login from './components/login/Login'
import { watchAll } from './sagas/index'
import './css/index.css'
import './css/index.less'

const history = createBrowserHistory()



const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, createLogger)
  )
)

sagaMiddleware.run(watchAll)

// const history = syncHistoryWithStore(createBrowserHistory(), store)
// history.listen(location => analyticsService.track(location.pathname))

const Div = props => (
  <Provider store={ store }>
    <HashRouter  history={history}>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={App}/>
      </Switch>
      </div>
    </HashRouter>
  </Provider>
)

ReactDOM.render(
  <Div />, document.getElementById('app')
)

