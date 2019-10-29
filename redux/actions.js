import * as firebase from "firebase";
import { Alert } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import "firebase/firestore";

export function login(user, name) {
	return function(dispatch) {
		let params = {
			id: user.uid,
			name: name,
			email: user.email,
			notification: false,
			token: " ",
			room: "",
			swipesyes: [],
			swipesno: []
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
					dispatch(allowNotifications());
				} else {
					firebase
						.firestore()
						.collection("users")
						.doc(user.uid)
						.set({
							id: params.id,
							name: params.name,
							email: params.email,
							notification: params.notification,
							token: params.token,
							room: "",
							swipesyes: [],
							swipesno: []
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
					var newRoomRef = db.collection("room").doc();
					const createdat = firebase.firestore.Timestamp.fromDate(new Date())
					newRoomRef.set({
						roomname: roomname,
						user1: userref.uid,
						user2: "",
						cards: [],
						day: 1,
						timestamp: createdat
					});
					newRoomRef.get().then(function(doc) {
						if (doc.exists) {
							const roomv = doc.data();
							room.push({
								id: doc.id,
								roomname: roomname,
								user1: roomv.user1,
								user2: roomv.user2,
								cards: roomv.cards,
								day: roomv.day,
								timestamp: roomv.timestamp
							});
						} else {
							console.log("cannot find document just created");
						}
						dispatch({
							type: "CREATE ROOM",
							payload: room,
							inroom: true
						});
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
						db.doc(doc.id).update({
							user2: userref.uid
						});
						const roomv = doc.data();
						room.push({
							id: doc.id,
							roomname: roomv.roomname,
							user1: roomv.user1,
							user2: roomv.user2,
							cards: roomv.cards,
							day: roomv.day,
							timestamp: roomv.timestamp
						});
						firebase
							.firestore()
							.collection("users")
							.doc(userref.uid)
							.update({
								room: doc.id
							});
					});
				}
				dispatch({ type: "JOIN ROOM", payload: room, inroom: true });
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

export function leaveroom() {
	return function(dispatch) {
		//firebase.auth().signOut();
		dispatch({ type: "LEAVEROOM", inroom: false });
	};
}

export function getCards(timestamp, day, cards, roomid) {
	return function(dispatch) {
		const now = new Date();
		const lastdate = timestamp.toDate()
		var Difference_In_Days =
			(now.getTime() - lastdate.getTime()) / (1000 * 3600 * 24);
		const userref = firebase.auth().currentUser;
		const newcards = cards;
		const room = roomid;
		const ref = firebase.firestore().collection("cards");
		if (Difference_In_Days >= 1) {
			const newday = day + 1;
			return ref
				.where("Day", "==", newday)
				.get()
				.then(function(querySnapshot) {
					if (querySnapshot.empty) {
						Alert.alert("No such card");
					} else {
						querySnapshot.forEach(function(doc) {
							const card = doc.data();
							const text = card.Text;
							const GIF = card.GIF;
							newcards.push({
								id: doc.id,
								text,
								GIF
							});
						});
						dispatch({ type: "GET_CARDS", payload: newcards });
						firebase
							.firestore()
							.collection("room")
							.doc(roomid)
							.update({
								cards: newcards,
								day: newday,
								timestamp: firebase.firestore.Timestamp.fromDate(new Date())
							});
					}
				});
		} else {
			if ((day, "==", 1)) {
				return ref
					.where("Day", "==", 1)
					.get()
					.then(function(querySnapshot) {
						if (querySnapshot.empty) {
							Alert.alert("No such card 2");
						} else {
							querySnapshot.forEach(function(doc) {
								const card = doc.data();
								const text = card.Text;
								const GIF = card.GIF;
								newcards.push({
									id: doc.id,
									text,
									GIF
								});
							});
							dispatch({ type: "GET_CARDS", payload: newcards });
							firebase
								.firestore()
								.collection("room")
								.doc(roomid)
								.update({
									cards: newcards,
								});
						}
					});
			}
		else{
			console.log("return already in use cards");
			dispatch({ type: "GET_CARDS", payload: newcards });
			}	
		}
	};
}

export function allowNotifications() {
	return function(dispatch) {
		Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result) {
			if (result.status === "granted") {
				Notifications.getExpoPushTokenAsync().then(function(token) {
					firebase
						.firestore()
						.collection("users")
						.doc(firebase.auth().currentUser.uid)
						.update({
							token: token
						});
					dispatch({ type: "ALLOW_NOTIFICATIONS", payload: token });
				});
			}
		});
	};
}

export function sendNotification(id, name, text) {
	return function(dispatch) {
		firebase
			.database()
			.ref("cards/" + id)
			.once("value", snap => {
				if (snap.val().token != null) {
					return fetch("https://exp.host/--/api/v2/push/send", {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							to: snap.val().token,
							title: name,
							body: text
						})
					});
				}
			});
	};
}
