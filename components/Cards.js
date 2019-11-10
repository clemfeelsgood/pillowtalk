import React from "react";
import styles from "../styles";
import { Overlay, Input } from "react-native-elements";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { addsuggest } from "../redux/actions";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class Cards extends React.Component {
  state = {
    isVisible: false,
    suggest: ""
  };

  addsuggestcard = () => {
    this.setState({ visible: false });
    this.props.dispatch(addsuggest(this.state.suggest, "card"));
  };

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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Matches")}
          >
            <Text style={styles.button}> Matches </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
            <Text style={styles.button}> Suggest Card </Text>
          </TouchableOpacity>
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
              onPress={this.addsuggestcard}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default withNavigation(Cards);
