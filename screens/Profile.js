import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { logout, addsuggest } from "../redux/actions";
import { Input } from 'react-native-elements';
import { Text, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

class Profile extends React.Component {
  state = {
    suggestion: ""
  };

  componentWillMount() {}

addsuggestion = ()  => {
  this.props.dispatch(addsuggest(this.state.suggestion,"suggestion"));
}



  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.h3}>If you wish your partner to join you, just give them the following room name:</Text>
        <Text style={styles.h2}>{this.props.roomid[0].roomname}</Text>
    
        
        <Input
          placeholder="Anything suggestion for us?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={suggestion => this.setState({ suggestion })}
          value={this.state.suggestion}
        /> 

        <TouchableOpacity onPress={this.addsuggestion}>
        <Text style={styles.button}> Send us your feedback </Text>
        </TouchableOpacity>

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
