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
import { addsuggest } from "../redux/actions";
import { Input } from 'react-native-elements';

class Rooms extends React.Component {
  state = { question: "", tip: "", errorMessage: null };

addsuggesttips = ()  => {
  this.props.dispatch(addsuggest(this.state.tip,"tip"));
}

addsuggestquestion = ()  => {
  this.props.dispatch(addsuggest(this.state.question,"question"));
}

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.h2}>In this section our goal is to create a safe space for discussions around relationships</Text>
        <Text style={styles.h3}>To start, we want to let our users learn from our experts, and share with others what works in their relationship. Feel free to participate</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
        )}
        
        <Input
          placeholder="Ask an anonymous question to our experts?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        /> 

        <TouchableOpacity onPress={this.addsuggestquestion}>
        <Text style={styles.button}> Send us your question </Text>
        </TouchableOpacity>

        <Input
          placeholder="Is there a tip you'd like to share?"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={tip => this.setState({ tip })}
          value={this.state.tip}
        />
        
        <TouchableOpacity onPress={this.addsuggesttips}>
        <Text style={styles.button}> Send us your tip </Text>
        </TouchableOpacity>

        <Text style={styles.h3}>All content is anonymous, we won't share it with others before getting your approval, and your partner won't see it.</Text>
      </View>
    );
  
}
}
//

function mapStateToProps(state) {
  return {
    user: state.user,
    roomid: state.roomid,
    inroom: state.inroom,
  };
}

export default connect(mapStateToProps)(Rooms);


