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
import { createRoom, joinRoom } from "../redux/actions";

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
        console.log(this.props.roomid);
        this.props.navigation.navigate("App");
      }
    });
  };

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
        <Button title="Create Room" onPress={this.createroom} />

        <TextInput
          placeholder="What's the room name?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={roomquery => this.setState({ roomquery })}
          value={this.state.roomquery}
        />

        <Button title="Join Room" onPress={this.joinroom} />
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
