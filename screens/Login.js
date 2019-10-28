import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import { login } from "../redux/actions";
import styles from '../styles'
import firebaseConfig from "../config/firebase.js";
import 'firebase/firestore';
import { connect } from "react-redux";
import { Input } from 'react-native-elements';

firebase.initializeApp(firebaseConfig);

class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Instructions"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.props.dispatch(login(user));
      }
    });
  }

  render() {
    if(this.props.loggedIn){
      return(this.props.navigation.navigate("Instructions"))
      } else {
    return (
      <View style={[styles.container, styles.center]}>
      <Image style={styles.logo} source={require('../assets/pillowtalk-logo.png')}/>
        
        <Text style={styles.h2}>Welcome, please Login or SignUp</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        
        <Input
          placeholder='Email'
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        /> 

        <Input
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        /> 
        
        <TouchableOpacity onPress={this.handleLogin}>
        <Text style={styles.button}> Login </Text>
        </TouchableOpacity>

        <Button
        style={styles.button}
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    );
  }
}
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);



