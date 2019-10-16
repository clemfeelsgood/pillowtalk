import * as firebase from "firebase";

export function login(user) {
	return function() {
		let params = {
			id: user.uid,
			name: user.displayName,
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
						.update({
							params
						});
					dispatch({ type: "LOGIN", user: params, loggedIn: true });
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
		const cards = [];
		firebase
			.firestore()
			.collection("cards")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const card = doc.data();
					const text = card.text;
					const image = card.image;
					cards.push({
						id: doc.id,
						doc, // DocumentSnapshot
						text,
						image
					});
				});
			});
		dispatch({ type: "GET_CARDS", payload: cards });
	};
}
