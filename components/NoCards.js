import React from "react";
import styles from "../styles";
import { Overlay, Input } from "react-native-elements";
import { Text, View, Button } from "react-native";

class NoCards extends React.Component {
state = {
    isVisible:false,
    suggest:'',
  }

addsuggest(suggest,type) {
    const userref = firebase.auth().currentUser;
    let suggestiondoc = firebase
      .firestore()
      .collection("suggestions")
      .doc()
      .set({
        user: userref.uid,
        text: suggest,
        category: type,
      });
    this.setState({ visible: false });
  }


	render() {
		return (
			<View>
				<Text>No more Cards, come back tomorrow</Text>

				<Overlay
					isVisible={this.state.isVisible}
					onBackdropPress={() => this.setState({ isVisible: false })}
					width="auto"
					height="auto"
				>
					<View>
						<Text>
							Just add your text below, we'll review and add
							later!
						</Text>
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
							onPress={() => this.addcard(this.state.suggest,"card")}
						/>
					</View>
				</Overlay>

				<View style={styles.homebutton}>
					<Button
						style={styles.button}
						title="Suggest Card"
						onPress={() => this.setState({ isVisible: true })}
					/>
				</View>
			</View>
		);
	}
}

export default NoCards;
