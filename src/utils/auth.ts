const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const PROFILE_SETUP_PENDING_KEY = 'profileSetupPending'

export function isLoggedIn() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) !== null
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function setTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
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
