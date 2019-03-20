import 'classnames';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import hashHistory from './lib/history';
import store from './createStore';
import RootView from './components/root';
console.log(Provider)

const root = (
  <div>123</div>
);

render(
  root,
  document.getElementById('container'),
);
