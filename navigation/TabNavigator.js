import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    Profile: Profile,
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      }
    } ,
    Matches: Matches,
    });

export default createAppContainer(TabNavigator);