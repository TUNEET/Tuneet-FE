const WELCOME_GUIDE_KEY_PREFIX = 'welcomeGuideSeen:'

const getKey = (userId: number) => `${WELCOME_GUIDE_KEY_PREFIX}${userId}`

export function hasSeenWelcomeGuide(userId: number) {
  try {
    return localStorage.getItem(getKey(userId)) !== null
  } catch {
    return true
  }
}

export function markWelcomeGuideSeen(userId: number) {
  try {
    localStorage.setItem(getKey(userId), 'true')
  } catch {}
}
