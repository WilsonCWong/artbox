export const authenticateUser = (auth) => {
  return {
    type: 'AUTH_USER',
    auth
  }
}