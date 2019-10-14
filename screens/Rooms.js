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
  state = { roomname: '',user1:'', user2:'', errorMessage: null }

createRoom = () => {
var db = firebase.firestore();

 db.collection("room").add({
    roomname: this.state.newroom,
    user1: "clem",
    user2: "",
})

.then(() => this.props.navigation.navigate('App'))

.catch(function(error) {
    console.error("Error writing document: ", error);
});
}


joinRoom = () => {
var db = firebase.firestore();
var query = db.collection("room").where("roomname", "==", this.state.roomquery)

query.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
    // doc.data() is never undefined for query doc snapshots
            
            db.collection("room").doc(doc.id).update({
              user2: "charlotte"
            }); 

            //console.log(doc.id, " => ", doc.data());  
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })

.then(() => this.props.navigation.navigate('App'))
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
          onChangeText={newroom => this.setState({ newroom })}
          value={this.state.newroom}
        />
        <Button title="Create Room" onPress={this.createRoom} />

        <TextInput
          placeholder="What's the room name?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={roomquery => this.setState({ roomquery })}
          value={this.state.roomquery}
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