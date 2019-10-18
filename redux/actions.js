import * as firebase from "firebase";
import { Alert } from "react-native";

export function login(user, name) {
	return function(dispatch) {
		let params = {
			id: user.uid,
			name: name,
			email: user.email,
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

export function createRoom(roomname) {
	return function(dispatch) {
		var db = firebase.firestore();
		const userref = firebase.auth().currentUser;
		var query = db.collection("room").where("roomname", "==", roomname);
		const room = [];
		return query
			.get()
			.then(function(querySnapshot) {
				if (querySnapshot.empty) {
					db.collection("room")
						.add({
							roomname: roomname,
							user1: userref.uid,
							user2: ""
						})
						.then(function(docRef) {
							console.log(docRef);
							const roomtemp = docRef.data();
							room.push({
								id: docRef.id,
								roomtemp
							});
						});
					dispatch({
						type: "CREATE ROOM",
						payload: room
					});
				} else {
					Alert.alert(
						"Room already exists, please pick another name"
					);
				}
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
	};
}

export function joinRoom(roomname) {
	return function(dispatch) {
		var db = firebase.firestore().collection("room");
		const userref = firebase.auth().currentUser;
		const room = [];
		return db
			.where("roomname", "==", roomname)
			.get()
			.then(function(querySnapshot) {
				if (querySnapshot.empty) {
					Alert.alert("No such room");
				} else {
					querySnapshot.forEach(function(doc) {
						const roomv = doc.data();
						room.push({
							id: doc.id,
							roomv
						});
						db.doc(doc.id).update({
							user2: userref.uid
						});
					});
				}
				dispatch({ type: "JOIN ROOM", payload: room });
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
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
		const ref = firebase.firestore().collection("cards");
		return ref.get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				const card = doc.data();
				const text = card.text;
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
