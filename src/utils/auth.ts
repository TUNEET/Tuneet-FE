const ACCESS_TOKEN_KEY = 'accessToken'
const PROFILE_SETUP_PENDING_KEY = 'profileSetupPending'

export function isLoggedIn() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) !== null
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function isProfileSetupPending() {
  return localStorage.getItem(PROFILE_SETUP_PENDING_KEY) !== null
}

export function markProfileSetupPending() {
  localStorage.setItem(PROFILE_SETUP_PENDING_KEY, 'true')
}

export function clearProfileSetupPending() {
  localStorage.removeItem(PROFILE_SETUP_PENDING_KEY)
}
