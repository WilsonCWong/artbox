export const authenticateUser = (auth) => {
  return {
    type: 'AUTH_USER',
    auth
  }
}

export const authenticating = (isAuthenticating) => {
  return {
    type: 'AUTHENTICATING',
    isAuthenticating
  }
}