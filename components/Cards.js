import React from "react";
import styles from "../styles";
import { Overlay, Input } from "react-native-elements";
import { Text, View, ImageBackground, Image, Button } from "react-native";
import { addsuggest } from "../redux/actions";

class Cards extends React.Component {
  state = {
    isVisible: false,
    suggest: ""
  };

  addsuggest(suggest, type) {
    const userref = firebase.auth().currentUser;
    let suggestiondoc = firebase
      .firestore()
      .collection("suggestions")
      .doc()
      .set({
        user: userref.uid,
        text: suggest,
        category: type
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
        <View style={styles.fixToText}>
          <Button
            style={styles.homebutton}
            title="Matches"
            onPress={() => this.props.navigation.push('Matches')}
          />
          <Button
            style={styles.homebutton}
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
              autoCapitalize="none"
              placeholder="Text for the card"
              onChangeText={suggest => this.setState({ suggest })}
              value={this.state.suggest}
            />
            <Button
              style={styles.button}
              title="Send"
              onPress={() => this.props.dispatch(addsuggest(this.state.suggest, "card")) && this.setState({ visible: false })}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default Cards;
