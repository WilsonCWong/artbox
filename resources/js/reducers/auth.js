const initialState = {
  authenticated: false,
  isAuthenticating: true,
}

export default function auth(state=initialState, action) {
  switch (action.type) {
    case 'AUTH_USER': {
      return {
        ...state,
        authenticated: action.auth,
      }
    }
    case 'AUTHENTICATING': {
      return {
        ...state,
        isAuthenticating: action.isAuthenticating,
      }
    }
    default:
      return state;
  }
}