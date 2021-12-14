import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers'

// Compose is used when you want to pass multiple store enhancers to the store. 
// Store enhancers are higher order functions that add some extra functionality to the store. 
// The only store enhancer which is supplied with Redux by default is applyMiddleware
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App/ >
  </Provider>, 
  document.getElementById('root'));