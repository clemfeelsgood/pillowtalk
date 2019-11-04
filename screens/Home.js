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


  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        yupStyle = {styles.yupStyle}
        yupText = {"I'm in"}
        nopeText = {"Nope"}
        hasMaybeAction={false}
      />  
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
