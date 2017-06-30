'use strict'
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import {connect, Provider} from 'react-redux'

import store from './store'

// import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router';
// import { HashRouter, BrowserRouter } from 'react-router-dom';

import App from './components/App'
// import TextInterface from './containers/TextInterface'

render (
  <Provider store={store}>
	  <App/>
  </Provider>,
  document.getElementById('app')
)