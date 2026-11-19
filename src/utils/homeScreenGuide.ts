const HOME_SCREEN_GUIDE_PENDING_KEY = 'homeScreenGuidePending'

export function markHomeScreenGuidePending() {
  try {
    localStorage.setItem(HOME_SCREEN_GUIDE_PENDING_KEY, 'true')
  } catch {}
}

export function shouldShowHomeScreenGuide() {
  try {
    return localStorage.getItem(HOME_SCREEN_GUIDE_PENDING_KEY) !== null
  } catch {
    return false
  }
}

export function markHomeScreenGuideSeen() {
  try {
    localStorage.removeItem(HOME_SCREEN_GUIDE_PENDING_KEY)
  } catch {}
}
