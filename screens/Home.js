import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import { getCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import { connect } from "react-redux";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";

import { StyleSheet, Platform, Image, Text, View } from "react-native";

class Home extends React.Component {
  constructor() {
    super();
    const userref = firebase.auth().currentUser;
    this.state = {
      userid: userref.uid,
    };
    //console.log(this.props.user.id);
  }

  componentWillMount() {
    const timestamp = this.props.roomid[0].timestamp;
    const cards = this.props.roomid[0].cards;
    const day = this.props.roomid[0].day;
    this.props.dispatch(getCards(timestamp,day,cards));
  }


  handleYup(card) {
    const userref = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(userref.uid)
      .update({
        swipesyes: firebase.firestore.FieldValue.arrayUnion(card.id)
      });

      //Check Match card: use usersinroom to get user2. Make sure that you are indeed taking the other user,
    //get swipes yes from user2
    //if card.id is in swipes yes return alert + notification
  }

  handleNope(card) {
    const userref = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(userref.uid)
      .update({
        swipesno: firebase.firestore.FieldValue.arrayUnion(card.id)
      });
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={true}
        showNope={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        hasMaybeAction={false}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    cards: state.cards,
    roomid: state.roomid,
  };
}

export default connect(mapStateToProps)(Home);
