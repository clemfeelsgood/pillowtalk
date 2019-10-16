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
  constructor(props) {
    super();
    this.ref = firebase.firestore().collection("cards");
    this.state = {
      cards: [],
      user: "clem"
    };
  }

  componentWillMount() {
    this.props.dispatch(getCards());
  }

  handleYup(card) {
    state = { userid: "gApoGfSZYbTPKnz8qFbp" };
    firebase
      .firestore()
      .collection("users")
      .doc(state.userid)
      .update({
        swipesyes: firebase.firestore.FieldValue.arrayUnion(card.id)
      });
  }

  handleNope(card) {
    firebase
      .firestore()
      .collection("users")
      .doc(state.userid)
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
    cards: state.cards
  };
}

export default connect(mapStateToProps)(Home);
