import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import 'firebase/firestore';
import { getCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import { connect } from "react-redux";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";
import { Overlay, Input } from 'react-native-elements';

import { StyleSheet, Platform, Image, Text, View, ImageBackground, Button } from "react-native";

class Home extends React.Component {
  constructor() {
    super();
    const userref = firebase.auth().currentUser;
    this.state = {
      userid: userref.uid,
      visible:false,
      suggest:''
    };
  }

  componentWillMount() {
    const timestamp = this.props.roomid[0].timestamp;
    const cards = this.props.roomid[0].cards;
    const day = this.props.roomid[0].day;
    const roomid = this.props.roomid[0].id;
    this.props.dispatch(getCards(timestamp, day, cards, roomid))
  }

  handleYup(card) {
  const userref = firebase.auth().currentUser;
  let userdoc = firebase.firestore().collection("users").doc(userref.uid);
  userdoc.update({
    swipesyes: firebase.firestore.FieldValue.arrayUnion(card.id)
  })

    //Check Match card: use usersinroom to get user2. Make sure that you are indeed taking the other user,
    //get swipes yes from user2
    //if card.id is in swipes yes return alert + notification
  }

  handleNope(card) {
  const userref = firebase.auth().currentUser;
  let userdoc = firebase.firestore().collection("users").doc(userref.uid);
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion(card.id);
  userdoc.update({
    swipesno: arrayUnion,
  })
  }

  addcard(suggest) {
  const userref = firebase.auth().currentUser;
  let suggestiondoc = firebase.firestore().collection("suggestions").doc().set({
    user: userref.uid,
    text: suggest});
  this.setState({ visible: false })
  }

  render() {
    return (
      <View>
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={true}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        hasMaybeAction={false}
      />
    
    <Button
        style={styles.button}
          title="Suggest Card"
          onPress={() => this.setState({ visible: true })}
    />

     {this.state.visible && (
    <Overlay isVisible>
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
      <Button
        style={styles.button}
          title="Close"
          onPress={() => this.setState({ visible: false })}
    />
    </Overlay>
    )
    }
    </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    roomid: state.roomid,
    cards: state.cards,
    inroom: state.inroom
  };
}

export default connect(mapStateToProps)(Home);
