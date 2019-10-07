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
      <TouchableOpacity onPress={() => this.nextPhoto()}>
        <ImageBackground style={styles.card} source={{uri: this.props.images[this.state.num]}}>
          <View style={styles.cardDescription}>
            <View style={styles.cardInfo}>
              <Text style={styles.bold}>{this.props.name}</Text>
              <Text>{this.props.aboutMe}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default Cards