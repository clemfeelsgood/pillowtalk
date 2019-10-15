import React from 'react';
import styles from '../styles'

import { 
  Text, 
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

class Description extends React.Component {

render() {
    return (
              <Text>{this.props.text}</Text>
            )  
          }
}


export default Description