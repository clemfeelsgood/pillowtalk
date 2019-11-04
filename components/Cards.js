import React from "react";
import styles from "../styles";
import { Overlay, Input } from "react-native-elements";
import { Text, View, ImageBackground, Image, Button } from "react-native";

class Cards extends React.Component {
  state = {
    isVisible: false,
    suggest: ""
  };

  addcard(suggest) {
    const userref = firebase.auth().currentUser;
    let suggestiondoc = firebase
      .firestore()
      .collection("suggestions")
      .doc()
      .set({
        user: userref.uid,
        text: suggest
      });
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.cardimage}
            source={{ uri: this.props.GIF }}
          ></Image>
          <View style={styles.cardDescription}>
            <View style={styles.cardInfo}>
              <Text style={styles.bold}>{this.props.text}</Text>
            </View>
          </View>
        </View>
        <View style={styles.homebutton}>
          <Button
            style={styles.button}
            title="Suggest Card"
            onPress={() => this.setState({ isVisible: true })}
          />
        </View>
     
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          width="auto"
          height="auto"
        >
          <View>
            <Text>Just add your text below, we'll review and add later!</Text>
            <Input
              secureTextEntry
              autoCapitalize="none"
              placeholder="Text for the card"
              onChangeText={suggest => this.setState({ suggest })}
              value={this.state.suggest}
            />
            <Button
              style={styles.button}
              title="Send"
              onPress={() => this.addcard(this.state.suggest)}
            />
          </View>
        </Overlay>
       </View> 
        

    );
  }
}

export default Cards;
