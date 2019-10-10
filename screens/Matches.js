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
 constructor() {
  super();
  this.state = {
    isLoading: true,
    user: {},
    key: '',
    swipes: [],
  };
}

  componentDidMount() {
  const ref = firebase.firestore().collection('users').doc("itgdthmol6ax4OZfPrD0");
  ref.get().then((doc) => {
    const user = doc.data();
    if (doc.exists) {
      this.setState({
        user: doc.data(),
        key: doc.id,
        isLoading: false,
        swipes: user.swipesyes
      });
      console.log(doc.id, " => ", doc.data(), swipes);
    } else {
      console.log("No such document!");
    }
  });

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
    user: state.user
  };
}

export default connect(mapStateToProps)(Matches);