import React, { Component } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Prompt,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import styles from "../styles";
import { createRoom, joinRoom } from "../redux/actions";
import { Input } from 'react-native-elements';

class Rooms extends React.Component {
  state = { roomname: "", user1: "", user2: "", errorMessage: null };

  createroom = () => {
    this.props.dispatch(createRoom(this.state.newroom)).then(result => {
      if (this.props.roomid.length > 0) {
        this.props.navigation.navigate("App");
      }
    });
  };

  joinroom = () => {
    this.props.dispatch(joinRoom(this.state.roomquery)).then(result => {
      if (this.props.roomid.length > 0) {
        this.props.navigation.navigate("App");
      }
    });
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.h2}>Connecting you with your partner</Text>
        <Text style={styles.h3}>If your partner already joined and created a room, use the name he created, otherwise pick a name and share it with your partner</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
        )}
        
        <Input
          placeholder="Name of the room you want to join?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={roomquery => this.setState({ roomquery })}
          value={this.state.roomquery}
        /> 

        <TouchableOpacity onPress={this.joinroom}>
        <Text style={styles.button}> Join Room </Text>
        </TouchableOpacity>

        <Input
          placeholder="Choose your room name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={newroom => this.setState({ newroom })}
          value={this.state.newroom}
        />
        
        <TouchableOpacity onPress={this.createroom}>
        <Text style={styles.button}> Create Room </Text>
        </TouchableOpacity>
        
        
        
        
      </View>
    );
  }
}
//

function mapStateToProps(state) {
  return {
    user: state.user,
    roomid: state.roomid
  };
}

export default connect(mapStateToProps)(Rooms);


