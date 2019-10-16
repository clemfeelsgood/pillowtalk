import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
  Image
} from 'react-native';

class Cards extends React.Component {
  //state = {
    //num: 0
  //}


  render() {
    return (
      <View>
        <Image style={styles.card} source={{uri: this.state.images[2]}} />
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}

export default Cards