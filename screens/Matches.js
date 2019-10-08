import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { 
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
      ],

    };
  }

  componentWillMount() {
     var db = firebase.firestore();
     var cards = db.collection("cards");


    //firebase.database().ref('cards/' + this.props.user.id + '/chats').on('value', (snap) => {
      //var items = [];
      //snap.forEach((child) => {
        //item = child.val();
        //items.push(item); 
      //});
      //this.setState({ cards: items.reverse() });
    //});
  }

  render() {
    return (
     <View style={styles.container} >
      <ScrollView>
        {this.state.cards.map((uri)=>{
          return (
            <TouchableOpacity>
              <Text style={[styles.bold, styles.center]}>{uri.text}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
     </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Matches);