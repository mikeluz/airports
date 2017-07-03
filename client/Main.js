'use strict'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
import {getAirports} from './reducers/airports'

render (
  <Provider store={store}>
	  <App getAirports={getAirports}/>
  </Provider>,
  document.getElementById('app')
)