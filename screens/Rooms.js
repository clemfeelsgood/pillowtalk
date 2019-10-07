import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Prompt
} from 'react-native';

class Rooms extends React.Component {

  render() {

    return (        
    
        <View>
          <TextInput
            placeholder={"What's your name?"}
            maxLength={20}
            value={this.props.username}
          />

        </View>
      
    );
  }
}

export default Rooms;

