import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator , createAppContainer} from 'react-navigation'
import * as firebase from 'firebase';

import TabNavigator from './TabNavigator.js';

import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Rooms from '../screens/Rooms'
import Home from '../screens/Home'

const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Loading : Loading,
    SignUp : SignUp,
    Login : Login,
    Rooms: Rooms,
    Home: Home
  },
  {
    initialRouteName: 'Login'
  }
)
export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
));