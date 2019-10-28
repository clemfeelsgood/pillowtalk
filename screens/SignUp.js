import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as firebase from "firebase";
import Login from './Login';
import firebaseConfig from "../config/firebase.js";
import "firebase/firestore";
import { login } from "../redux/actions";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


class SignUp extends React.Component {
  state = { name: "", email: "", password: "", errorMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Rooms"))
      .catch(error => this.setState({ errorMessage: error.message }));     

      firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(user, this.state.name))
      }
    });

  }; 

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.h2}>Please create an account</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
        )}
        <Input
          placeholder='Name'
          autoCapitalize="none"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />  
        <Input
          placeholder='Email'
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        /> 
        <Input

          placeholder='Password'
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        /> 
        <Text></Text>
        <Button 
        raised title="Sign Up" onPress={this.handleSignUp} icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
  />
        <Button type="clear"
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(SignUp);

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    color: '#0637CC',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    padding: 15,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#868686',
  }
});
