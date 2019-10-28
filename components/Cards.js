import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
  ImageBackground,
  Image,
} from 'react-native';

class Cards extends React.Component {
  

  render() {
    return (
        <View style={styles.card}>
        <Image style={styles.cardimage} source={{uri: this.props.GIF}}>
          
        </Image>
        <View style={styles.cardDescription}>
            <View style={styles.cardInfo}>
              <Text style={styles.bold}>{this.props.text}</Text>
            </View>
        </View>
        
        </View>
    )
  }
}

export default Cards