import React, { Component } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Prompt
} from "react-native";
import { connect } from "react-redux";
import { createRoom, joinRoom } from '../redux/actions'

class Rooms extends React.Component {
  state = { roomname: "", user1: "", user2: "", errorMessage: null };


  render() {
    return (
      <View style={styles.container}>
        <Text>Room</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
        )}
        <TextInput
          placeholder="Choose your room name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={newroom => this.setState({ newroom })}
          value={this.state.newroom}
        />
        <Button title="Create Room" onPress={() => this.props.dispatch(createRoom(this.state.newroom)) } />

        <TextInput
          placeholder="What's the room name?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={roomquery => this.setState({ roomquery })}
          value={this.state.roomquery}
        />

        <Button title="Join Room" onPress={() => this.props.dispatch(joinRoom(this.state.roomquery))} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Rooms);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
