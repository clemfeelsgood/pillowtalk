import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Rooms from '../screens/Rooms';
import Matches from '../screens/Matches';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    Rooms: {
      screen: Rooms,
      navigationOptions: {
        tabBarLabel: 'Rooms',
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: 'Matches',
      },
    },
  },
  {
    navigationOptions: {
      header: null
    },
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        height: 40
      },
    }
  }
);

export default createAppContainer(TabNavigator);