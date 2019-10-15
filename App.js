import React from 'react';
import styles from './styles.js'
import TabNavigator from './navigation/TabNavigator.js';
import Onboarding from './navigation/Onboarding.js';
import { Text, View, YellowBox } from 'react-native';
import Login from './screens/Login.js'
import Home from './screens/Home.js'

import reducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducers, middleware);
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

export default class App extends React.Component {


  render() {
    return (
          <Provider store={store}>
        <Onboarding/>
      </Provider>
    );
  }
}