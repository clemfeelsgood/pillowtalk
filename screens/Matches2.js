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




  


usersinroom = (roomref) => {
roomref.get().then((doc) => {
    if (doc.exists) {
      users = doc.data()
      this.setState({
        users: users.userid1
      });
        console.log(users.userid1);
    } else {
      console.log("No such document!");
    }
  });
}

onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    const {email, name, swipesno, swipesyes } = doc.data();
    boards.push({
      key: doc.id,
      doc, 
      swipesno,
      swipesyes,
    });
  });
  this.setState({
    boards,
    isLoading: false,
 });
}



class Matches extends React.Component {
 constructor() {
  super();
  //this.ref = firebase.firestore().collection('users').doc("itgdthmol6ax4OZfPrD0");


  //const refuser2 = firebase.firestore().collection('users').doc("gApoGfSZYbTPKnz8qFbp");
  this.state = {
    isLoading: true,
    user1: '',
    user2: '',
    key: '',
    boards: [],
    swipes: [],
    swipes2: [],
  };
}

  componentDidMount() {
  console.log(this.props.room);
  const roomref = firebase.firestore().collection('room').doc("OemdFcTJIBiJIMrYPAa3");
  user1 = '';
  user2 = '';
  roomref.get().then((doc) => {
    if (doc.exists) {
      users = doc.data()
      this.setState({
        user1: users.userid1
      });
        console.log(users.userid1);
    } else {
      console.log("No such document!");
    }
  });
  var users = this.usersinroom(roomref);
  console.log(this.state.user1, "No such document!");
  const ref1 = firebase.firestore().collection('users').doc(this.state.user1);
  const ref2 = firebase.firestore().collection('users').doc(this.state.user2);

  ref1.get().then((doc) =>{
    if (doc.exists) {
      const user1data = doc.data();
      console.log(user1data.swipesyes);
    } else {
      console.log("No such document! 2");
    }
  })
  swipes1 = user1data.swipesyes;

  //this.ref2 = firebase.firestore().collection('users').doc(user2);
  //this.swipesyes1 = this.ref1.onSnapshot(onswipesyesupdate);
  //this.swipesyes2 = this.ref2.onSnapshot(onswipesyesupdate);
  }  

  render() {
    return (
     <View style={styles.container} >
      <ScrollView>
        {this.state.swipes.map((uri)=>{
          
            <TouchableOpacity style={styles.imgRow} >
              <Text style={[styles.bold, styles.center]}>{uri}</Text>
            </TouchableOpacity>
          
        })}
      </ScrollView>
     </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    swipes: state.swipes,
  };
}

export default connect(mapStateToProps)(Matches);
