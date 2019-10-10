export default reducers = (state = {
    loggedIn: false,
    cards: [],
    user: {
		  name: '',
		  email: '',
		  name: '',
		  swipes: [],
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
    }
    return state;
} 