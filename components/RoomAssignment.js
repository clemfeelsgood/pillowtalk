import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      username: '', // the name of the user
      piece: '', // the piece assigned to the user
      partner: '', // the name of the partner player
      is_playing: false, // whether the user is currently playing or not 
      show_prompt: false, // whether the prompt box for entering the room name is visible
      is_waiting: false, // whether the user is currently waiting for another player (rival) or not
      is_room_creator: false // whether the user is the room's creator
    }

    this.room = null; // the room  where data regarding the game will be sent
    this.is_channel_binded = false; // whether a channel has already been binded or not

    this.onChangeUsername = this.onChangeUsername.bind(this); // executes when the value of the username text field changes
    this.onPressCreateRoom = this.onPressCreateRoom.bind(this); // executes when user creates a room
    this.onPressJoinRoom = this.onPressJoinRoom.bind(this); // executes when user taps on the join room button
    this.joinRoom = this.joinRoom.bind(this); // the function for joining a room
    this.onCancelJoinRoom = this.onCancelJoinRoom.bind(this); // executes when user cancels joining a room
    this.endGame = this.endGame.bind(this); // the function for ending the game

  }
}
Before the component is mounted, connect to Pusher using the credentials you’ve been given when you created the Pusher app:

componentWillMount() {
  this.pusher = new Pusher('YOUR PUSHER API KEY', {
    authEndpoint: 'YOUR AUTH ENDPOINT',
    cluster: 'YOUR PUSHER APP CLUSTER',
    encrypted: true
  });
}

componentDidUpdate() {
  if(this.state.is_waiting && !this.is_channel_binded){

    this.game_channel.bind('client-joined', (data) => {
      this.setState({
        is_waiting: false,
        is_playing: true,
        rival_username: data.username
      });

      if(this.state.is_room_creator){
        // inform the one who joined the room that the game can begin
        this.game_channel.trigger('client-joined', {
          username: this.state.username // send the name of the room creator to the one who joined
        });
      }
    });

    this.is_channel_binded = true;
  }
}