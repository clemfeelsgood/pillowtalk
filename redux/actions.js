import * as firebase from "firebase";

export function login(user) {
	return function(dispatch) {
		let params = {
			id: user.uid,
			name: "",
			swipesyes: [],
			swipesno: [],
			notification: false,
			show: false,
			report: false,
			token: " "
		};
		firebase
			.firestore()
			.collection("users")
			.doc(user.uid)
			.get()
			.then(doc => {
				if (doc.exists) {
					dispatch({
						type: "LOGIN",
						user: doc.data(),
						loggedIn: true
					});
				} else {
					firebase
						.firestore()
						.collection("users")
						.doc(user.uid)
						.set({
							params
						});
					dispatch({ type: "SIGNUP", user: params, loggedIn: true });
				}
			});
	};
}

export function logout() {
	return function(dispatch) {
		firebase.auth().signOut();
		dispatch({ type: "LOGOUT", loggedIn: false });
	};
}

export function getCards() {
	return function(dispatch) {
		const items = [];
		const ref = firebase.firestore().collection('cards');
		return ref.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					const card = doc.data();
					const text = card.text;
					console.log(text);
					const image = card.image;
					items.push({
						id: doc.id,
						text,
						image
					});
				});
				dispatch({ type: "GET_CARDS", payload: items });
			});
		
	};
}
