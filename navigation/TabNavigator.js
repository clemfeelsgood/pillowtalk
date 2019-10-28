import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Rooms from '../screens/Rooms';
import Matches from '../screens/Matches';
import styles from '../styles'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        //tabBarIcon: ({focused}) => (
          //<Image style={ styles.logo } source={require('../assets/profile-logo.png')}/>
        //),
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
        height: 75
      },
    }
  }
);

export default createAppContainer(TabNavigator);