import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { logout } from "../redux/actions";

import { Text, View, TouchableOpacity } from "react-native";

class Profile extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.h3}>If you wish your partner to join you, just give them the following room name:</Text>
        <Text style={styles.h2}>{this.props.roomid[0].roomname}</Text>
        <TouchableOpacity onPress={() => this.props.dispatch(logout())}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    roomid: state.roomid
  };
}

export default connect(mapStateToProps)(Profile);
