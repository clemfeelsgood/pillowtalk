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
    this.props.dispatch(getCards());
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
        showYup={false}
        showNope={false}
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
