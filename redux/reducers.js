export default reducers = (state = {
    loggedIn: false,
    cards: [],
    roomid:'',
    user: {
      id: '',
      name: '',
      email: '',
      swipesyes: [],
      swipesno: [],
      notification: false,
      show: false,
      report: false,
      token: ' ',
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
        return { ...state, room: action.payload
      }
      case 'CREATE ROOM':      
        return { ...state, room: action.payload
      }
    }
    return state;
} 