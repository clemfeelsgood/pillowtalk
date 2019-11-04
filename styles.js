import React from 'react';
import { StyleSheet } from 'react-native';

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  color: {
    color: '#df4723'
  },
  logo: {
    width: deviceWidth*0.9,
    padding: 30
  },
  homecard:{
    marginTop: 50,
  },
  yupStyle:{
    marginTop:50,
  },
  homebutton:{
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#051033',
    textAlign: 'center',
    color: '#051033',
    padding: 8,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 15,
  },
  h1: {

  },
  h2: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    color: '#0637CC',
  },
  h3: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 15,
    color: '#868686',
   } ,
  nav: {
    marginTop: 70
  },
  MatchD: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#868686',
    fontSize: 15,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    backgroundColor: '#fff',
  },
  imgRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15,
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100
  },
  textInputlogin: {
    width: deviceWidth*0.7,
    padding: 15,
    backgroundColor: '#fff',
    height: 30,
    margin: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#868686',
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#051033',
    textAlign: 'center',
    color: '#051033',
    padding: 8,
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    width: deviceWidth*.9,
    height: deviceHeight*.50,
    borderRadius: 50,
    marginTop:50,
    backgroundColor: '#e6e2da',
  },
  cardimage: {
    marginTop: 50,
    alignItems: 'center',
    width: deviceWidth*.9,
    height: deviceHeight*.20,
  },
  cardDescription: {
    padding: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardInfo: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  border: {
    borderTopColor: '#bbb', 
    borderTopWidth: 0.5, 
  },
})

module.exports = styles