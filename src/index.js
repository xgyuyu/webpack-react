import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers  } from 'redux'

const reducer = ( state = [], action ) => {
  return state
}

const store = createStore(reducer)

ReactDOM.render(
    <div>Hello World123</div>, document.getElementById('app')
)