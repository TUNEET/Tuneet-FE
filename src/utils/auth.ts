const ACCESS_TOKEN_KEY = 'accessToken'

export function isLoggedIn() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) !== null
}
