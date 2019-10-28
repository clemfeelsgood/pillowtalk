import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
} from 'react-native';

class NoCards extends React.Component {
  render() {
    return (
      <View>
        <Text>No more Cards, come back tomorrow</Text>
      </View>
    )
  }
}

export default NoCards