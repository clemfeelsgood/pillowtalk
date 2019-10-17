export default reducers = (state = {
    loggedIn: false,
    cards: [],
    user: {
      id: '',
      name: '',
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
      case 'SIGNUP': {
        return { ...state, user: action.user, loggedIn: action.loggedIn }
      }
      case 'LOGOUT': {
        return { ...state, loggedIn: action.loggedIn }
      }
      case 'UPLOAD_IMAGES': {
        return { ...state, user: {...state.user, images: action.payload } }
      }
      case 'UPDATE_ABOUT':      
        return { ...state, user: { ...state.user, aboutMe : action.payload } 
      }
      case 'GET_CARDS':      
        return { ...state, cards: action.payload
      }
    }
    return state;
} 