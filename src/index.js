/**
 * React Native Mongo Shop App
 * https://github.com/andy-pro/mongo-shop-react-native
 * based on
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import React from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Router } from 'react-native-router-flux'

// Consts and Libs
import { AppStyles } from '@theme/';
import AppRoutes from '@navigation/';
// import Analytics from '@lib/analytics';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

// Connect RNRF with Redux
const RouterWithRedux = connect()(Router);

let middleware = [
  // Analytics,
  thunk, // Allows action creators to return functions (not just plain objects)
];

/* global __DEV__ */
if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    logger({collapsed: true}),
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(rootReducer);

/* Component ================================================================ */
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function Main() {
  return (
    <Provider store={store}>
      <RouterWithRedux scenes={AppRoutes} style={AppStyles.appContainer} />
    </Provider>
  );
}
