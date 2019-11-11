export default reducers = (state = {
    loggedIn: false,
    inroom:false,
    roomid: {
      id:'',
      name: '',
      user1: '',
      user2:'',
      cards:[],
      day: 1,
      timestamp: '',
    },
    user: {
      id: '',
      name: '',
      email: '',
      notification: false,
      token: ' ',
      room:'',
      swipesyes:[],
      swipesno:[],
    }
  }, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, user: action.user, loggedIn: action.loggedIn }
      }
      case 'LOGOUT': {
        return { ...state, loggedIn: action.loggedIn }
      }
      case 'GET_CARDS':      
        return { ...state, cards: action.payload
      }
      case 'JOIN ROOM':      
        return { ...state, roomid: action.payload, inroom: action.inroom
      }
      case 'CREATE ROOM':      
        return { ...state, roomid: action.payload, inroom: action.inroom
      }
      case 'RETRIEVE ROOM':      
        return { ...state, roomid: action.payload, inroom: action.inroom
      }
      case 'ALLOW_NOTIFICATIONS':      
        return { ...state, user: { ...state.user, token : action.payload } 
      }
      case 'ADDSUGGEST':      
        return { ...state
      }
    }
    return state;
} 