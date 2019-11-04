import React from 'react';
import styles from './styles.js'
import Login from './screens/Login';
import { Text, View, YellowBox } from 'react-native';
import * as Font from 'expo-font';
import RootNavigator from './navigation/RootNavigator'

import reducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducers, middleware);
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

export default class App extends React.Component {

componentDidMount() {
    Font.loadAsync({
      'Damion': require('./assets/fonts/Damion-Regular.ttf'),
      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}