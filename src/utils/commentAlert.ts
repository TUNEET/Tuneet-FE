const LAST_SEEN_COMMENT_KEY_PREFIX = 'lastSeenCommentId:'
const LEGACY_LAST_SEEN_COMMENT_KEY = 'lastSeenCommentId'

const getKey = (userId: number) => `${LAST_SEEN_COMMENT_KEY_PREFIX}${userId}`

export function getLastSeenCommentId(userId: number) {
  try {
    return Number(localStorage.getItem(getKey(userId))) || 0
  } catch {
    return 0
  }
}

export function markCommentSeen(userId: number, id: number) {
  if (id <= getLastSeenCommentId(userId)) return
  try {
    localStorage.setItem(getKey(userId), String(id))
    localStorage.removeItem(LEGACY_LAST_SEEN_COMMENT_KEY)
  } catch {}
}
