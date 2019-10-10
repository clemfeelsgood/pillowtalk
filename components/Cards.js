import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

class Cards extends React.Component {
  //state = {
    //num: 0
  //}


  render() {
    return (
            <View style={styles.cardInfo}>
              <Text style={styles.bold}>{this.props.name}</Text>
              <Text>{this.props.aboutMe}</Text>
            </View>
    )
  }
}

export default Cards