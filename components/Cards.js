import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
  ImageBackground,
} from 'react-native';

class Cards extends React.Component {
  

  render() {
    return (
        <ImageBackground style={styles.card} source={{uri: this.props.image}}>
          <View style={styles.cardDescription}>
            <View style={styles.cardInfo}>
              <Text style={styles.bold}>{this.props.text}</Text>
            </View>
          </View>
        </ImageBackground>
    )
  }
}

export default Cards