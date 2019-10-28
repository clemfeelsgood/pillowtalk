import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Prompt,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import { connect } from "react-redux";

class Instructions extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.h2}>Welcome to the beta of Common Ground</Text>
        <View style={{flex: 0.2,height: 30,padding: 20,}}>
        <Text
        style={styles.h3}>
          The following app is a prototype of a specific feature called Common
          Ground
        </Text>

        <Text
        style={styles.h3}>
          You and your partner are invited to create an account, join a room to
          start finding activities
        </Text>

        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Rooms")}>
        <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
        

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Instructions);
