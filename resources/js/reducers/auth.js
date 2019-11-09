const initialState = {
  authenticated: false,
}

export default function auth(state=initialState, action) {
  switch (action.type) {
    case 'AUTH_USER': {
      return {
        ...state,
        authenticated: action.auth,
      }
    }
    default:
      return state;
  }
}