import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import * as firebase from "firebase";

import { Text, ScrollView, TouchableOpacity, Image, View } from "react-native";

class Matches extends React.Component {
  constructor() {
    super();
    this.roomref = firebase.firestore().collection("room");
    this.userref = firebase.firestore().collection("users");
    this.state = {
      isLoading: true,
      userid1: "",
      userid2: "",
      key: "",
      swipes: [],
      swipes1: [],
      swipes2: []
    };
  }

  usersinroom = roomref => {
    const room = firebase
      .firestore()
      .collection("room")
      .doc(roomref);
    return room.get().then(doc => {
      if (doc.exists) {
        userid1: "";
        users = doc.data();
        this.setState({
          userid1: users.userid1,
          userid2: users.userid2
        });
      } else {
        console.log("No such document!");
      }
    });
  };

  swipesyes = userid => {
    return this.userref
      .doc(userid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const user = doc.data();
          this.setState({
            swipes: user.swipesyes
          });
        } else {
          console.log("No such document! 2");
        }
      });
  };

  cardsdetails = idlist => {
    var cardsref = firebase.firestore().collection("cards");
    const boards = [];
    idlist.forEach(function(element) {
      return cardsref.doc(element).get().then(doc => {
        if (doc.exists) {
          const { text, image, category } = doc.data();
          boards.push({
            key: doc.id,
            text,
            image,
            category
          });
        } else {
          console.log("No such document! 2");
        }
      });
      this.setState({
      boards
    });
  });  
  };

  intersect = (a, b) => {
    var t;
    if (b.length > a.length) (t = b), (b = a), (a = t); // indexOf to loop over shorter
    return a.filter(function(e) {
      return b.indexOf(e) > -1;
    });
  };

  componentWillMount() {
    //console.log(this.props.room);
    this.usersinroom("OemdFcTJIBiJIMrYPAa3").then(result => {
      console.log(this.state.userid1);
      console.log(this.state.userid2);
      this.swipesyes(this.state.userid1).then(result2 => {
        const swipes1 = this.state.swipes;
        console.log(swipes1);
        this.setState({ swipes1: swipes1 });
        this.swipesyes(this.state.userid2).then(result3 => {
          const swipes2 = this.state.swipes;
          this.setState({ swipes2: swipes2 });
          console.log(swipes2);
          const swipes = this.intersect(swipes1, swipes2);
          console.log("swipes", swipes);
          this.setState({ swipes: swipes });
          this.cardsdetails(this.state.swipes).then(result4 => {
            console.log(this.state.boards);
          });
        });
      });
      console.log("at the end of this.usersinroom");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.swipes1.map(uri => {
            <TouchableOpacity style={styles.imgRow}>
              <Text style={[styles.bold, styles.center]}>{uri}</Text>
            </TouchableOpacity>;
          })}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    swipes: state.swipes
  };
}

export default connect(mapStateToProps)(Matches);
