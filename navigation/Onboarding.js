import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Home'

const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRouteName: 'Loading'
  }
)
export default Onboarding