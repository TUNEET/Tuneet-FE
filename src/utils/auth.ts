import { invalidateRequest } from './requestCache'

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
  invalidateRequest()
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isProfileSetupPending() {
  return localStorage.getItem(PROFILE_SETUP_PENDING_KEY) !== null
}

const LEGACY_PENDING_VALUE = 'true'

const normalizeEmail = (email: string) => email.trim().toLowerCase()

export function markProfileSetupPending(email: string) {
  localStorage.setItem(PROFILE_SETUP_PENDING_KEY, normalizeEmail(email))
}

export function syncProfileSetupPending(loginEmail: string) {
  const pendingEmail = localStorage.getItem(PROFILE_SETUP_PENDING_KEY)
  if (pendingEmail === null || pendingEmail === LEGACY_PENDING_VALUE) return
  if (pendingEmail !== normalizeEmail(loginEmail)) clearProfileSetupPending()
}

export function clearProfileSetupPending() {
  localStorage.removeItem(PROFILE_SETUP_PENDING_KEY)
}
