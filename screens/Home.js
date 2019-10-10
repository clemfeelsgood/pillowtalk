import React from 'react';
import styles from '../styles';
import * as firebase from 'firebase';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import Cards from '../components/Cards.js';
import NoCards from '../components/NoCards.js';

import { StyleSheet, Platform, Image, Text, View} from 'react-native';



class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class Home extends React.Component {
constructor(props) {
   //var db = firebase.firestore();
   //var querycards = db.collection("cards")
   //var items = [];

  //querycards.get()
    //.then(function(querySnapshot) {
      //  querySnapshot.forEach(function(doc) {
        //     item = doc.val();
          //   item.id = doc.key; 
            //items.push(item);
            //console.log(doc.id, " => ", doc.data());  
          //  }); 
            
        //})
    //this.state = {
      //cards: items,
    //}
  //};  



   super(props);
    this.state = {
    cards: 
      [
        {text: 'test', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ],


    };
  }

  //componentDidMount() {
  //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//}

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
   handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
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
