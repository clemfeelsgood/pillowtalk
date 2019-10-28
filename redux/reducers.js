export default reducers = (state = {
    loggedIn: false,
    cards: [],
    roomid:[],
    user: {
      id: '',
      name: '',
      email: '',
      notification: false,
      token: ' ',
      room:'',
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
        return { ...state, roomid: action.payload
      }
      case 'CREATE ROOM':      
        return { ...state, roomid: action.payload
      }
      case 'ALLOW_NOTIFICATIONS':      
        return { ...state, user: { ...state.user, token : action.payload } 
      }
    }
    return state;
} 