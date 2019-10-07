import React from 'react';
import styles from '../styles';
import * as firebase from 'firebase';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import Cards from '../components/Cards.js';
import NoCards from '../components/NoCards.js';

import { StyleSheet, Platform, Image, Text, View} from 'react-native';



class Home extends React.Component {
state = {
    cards: [
      {text: 'fran'},
      {text: 'jackie'},
      {text: 'phil'},
      {text: 'jacks'},
      {text: 'mellow'},
      {text: 'frank'},
      {text: 'timmmay'},
    ]
  };
  componentWillMount(){
    this.props.dispatch(getCards())
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    cards: state.cards
  };
}

export default connect(mapStateToProps)(Home);
