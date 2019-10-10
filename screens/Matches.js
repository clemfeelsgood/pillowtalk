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
     var currentroom = "h9KcaOHi4h5hsTtoTccC"
     var matches = db.collection("cards").where("roomname", "==", this.state.roomquery)

     cardslist.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
    // doc.data() is never undefined for query doc snapshots
            
            this.state = this.state 

            console.log(doc.id, " => ", doc.data());  
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })

.then(() => this.props.navigation.navigate('App'))
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