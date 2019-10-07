import React from 'react';
import styles from '../styles';
import firebase from 'react-native-firebase';

import { StyleSheet, Platform, Image, Text, View} from 'react-native';

export default class Home extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

render() {
    const { currentUser } = this.state
  

    return (
     <View>
      <Text>Hi {currentUser && currentUser.email} !</Text>
     </View>
    )
  }
}