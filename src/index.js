import React from 'react';
import ReactDOM from 'react-dom';
// 引用redux
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger' // 利用redux-logger打印日志


import App from './components/App'
import { watchIncrementAsync } from './sagas';
import './css/index.css'
import './css/index.less'


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, createLogger)
  )
)

sagaMiddleware.run(watchIncrementAsync);

ReactDOM.render(
  <Provider store={ store }>
    <App></App>
  </Provider>, document.getElementById('app'),
)
