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

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
  }

function retrieveswipesyes (userid) {
  const refuser = firebase.firestore().collection('users').doc(userid);
  var swipesyes = [];
  refuser.get().then((doc) => {
    const user = doc.data();
    if (doc.exists) {
      swipesyes= user.swipesyes;
      this.swipesyes;
      console.log(" => ", swipesyes);   
    } 
  else {
    console.log("No such document!");
      }
    });
  }

class Matches extends React.Component {
 constructor() {
  super();
  this.state = {
    isLoading: true,
    user: {},
    key: '',
    swipes: [],
    swipes2: [],
  };
}

  componentDidMount() {
  //"itgdthmol6ax4OZfPrD0"
  const refuser2 = firebase.firestore().collection('users').doc("gApoGfSZYbTPKnz8qFbp");
  refuser2.get().then((doc) => {
    const user2 = doc.data();
    if (doc.exists) {
      swipes: user2.swipesyes,
            this.setState({
              user2: doc.data(),
              swipes: user2.swipesyes,
      });
            //console.log(doc.id, " => ", doc.data());
     } 
     else {
      console.log("No such document!");
      }
  }); 
  var swipes2 = retrieveswipesyes("itgdthmol6ax4OZfPrD0");
     console.log(" => ", swipes2);    
  }  
  render() {
    return (
     <View style={styles.container} >
      <ScrollView>
        {this.state.swipes.map((uri)=>{
          return (
            <TouchableOpacity style={styles.imgRow} >
              <Text style={[styles.bold, styles.center]}>{uri}</Text>
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
    swipes: state.swipes
  };
}

export default connect(mapStateToProps)(Matches);