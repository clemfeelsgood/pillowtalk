import React, { Component } from 'react';
import * as firebase from 'firebase';
import TabNavigator from '../navigation/TabNavigator'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Prompt
} from 'react-native';

export default class Rooms extends React.Component {
  state = { user1:'', user1cards: '', user2:'', user2cards:'', errorMessage: null }

createRoom = () => {
var db = firebase.firestore();

 db.collection("room").add({
    user1: this.state.user1,
    
})

.then(() => this.props.navigation.navigate('App'))

.catch(function(error) {
    console.error("Error writing document: ", error);
});


//var db = firebase.firestore();
  //const roomRef = db.collection("room").add({
    //user1: this.state.user1,
  //});  
  //this.setState({
    //user1: "",
  //});  
//})
}

joinRoom = () => {
    
var db = firebase.firestore();
  const userRef = db.collection("room").doc("LKWRjuwsfsESLkrmSrrk").update({
    user2: this.state.user2,
  });  
  this.setState({
    user2: "",
  });  
}

render() {
    return (
      <View style={styles.container}>
        <Text>Room</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}> {this.state.errorMessage} </Text>}
        <TextInput
          placeholder="Choose your room name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={user1 => this.setState({ user1 })}
          value={this.state.user1}
        />
        <Button title="Create Room" onPress={this.createRoom} />

        <TextInput
          placeholder="Other User Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={user2 => this.setState({ user2 })}
          value={this.state.user2}
        />
        
        <Button title="Join Room" onPress={this.joinRoom} />
      
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})