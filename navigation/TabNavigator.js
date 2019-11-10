import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Rooms from '../screens/Rooms';
import Forme from '../screens/Forme';
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
        tabBarLabel: 'Common',
      }
    },
    Forme: {
      screen: Forme,
      navigationOptions: {
        tabBarLabel: 'For Me',
      },
    },
  },
  {
    navigationOptions: {
      header: null
    },
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 75
      },
    }
  }
);

export default createAppContainer(TabNavigator);