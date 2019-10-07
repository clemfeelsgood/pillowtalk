import * as firebase from 'firebase';

export function login(input){
  return function(dispatch){
    dispatch({ type: 'LOGIN', payload: input });
  }
}

export function getCards(){
	return function(dispatch){
		firebase.database().ref('card').once('value', (snap) => {
		  var items = [];
		  snap.forEach((child) => {
		    item = child.val();
		    item.id = child.key;
		    items.push(item); 
		  });
		  dispatch({ type: 'GET_CARDS', payload: items });
		});
	}
}