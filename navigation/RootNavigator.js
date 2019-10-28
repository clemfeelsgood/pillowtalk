import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator , createAppContainer} from 'react-navigation'
import * as firebase from 'firebase';

import TabNavigator from './TabNavigator.js';

import Instructions from '../screens/Instructions'
import Rooms from '../screens/Rooms'
import Home from '../screens/Home'



const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
  }
);

const OnboardingStack = createStackNavigator(
  {
    Instructions : Instructions,
    Rooms: Rooms,
    Home: Home,
  },
);




const RootStackNavigator = createAppContainer(createSwitchNavigator(
  {
    Onboarding: OnboardingStack,
    App: AppStack,

  },
  {
    initialRouteName: 'Onboarding',
  }
));

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator/>;
  }
}