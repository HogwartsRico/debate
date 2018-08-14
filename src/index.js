import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store, { history } from './store';
import './assets/css/index.css';
import { getToken } from './utils';
import { AUTH_USER } from './constants/types';

const token = getToken();
if (token) store.dispatch({ type: AUTH_USER, payload: token });
ReactDOM.render(
  <Routes store={store} history={history} />,
  document.getElementById('root')
);
