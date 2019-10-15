import * as firebase from 'firebase';

export function login(user){
	return function(dispatch){
		let params = {
		  id: user.uid,
		  name: user.displayName,
		  swipesyes: [],
		  swipesno: [],
		  notification: false,
		  show: false,
		  report: false,
		  token: ' ',
		}

		firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
		  if(snapshot.val() !== null){
		    dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
		  } else {
		    firebase.database().ref('cards/' + user.uid ).update(params);
		    dispatch({ type: 'LOGIN', user: params, loggedIn: true });
		  }
		})
  }
}

export function logout(){
	return function(dispatch){
    firebase.auth().signOut()
    dispatch({ type: 'LOGOUT', loggedIn: false });
   }
}


//export function getCards(){
	//return function(dispatch){
	//	firebase.database().ref('cards').once('value', (snap) => {
	//	  var items = [];
	//	  snap.forEach((child) => {
	//	    item = child.val();
	//	    item.id = child.key;
	//	    items.push(item); 
	//	  });
	//	  dispatch({ type: 'GET_CARDS', payload: items });
	//	});
	//}
//}
