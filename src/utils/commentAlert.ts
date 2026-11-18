const LAST_SEEN_COMMENT_KEY = 'lastSeenCommentId'

export function getLastSeenCommentId() {
  try {
    return Number(localStorage.getItem(LAST_SEEN_COMMENT_KEY)) || 0
  } catch {
    return 0
  }
}

export function markCommentSeen(id: number) {
  if (id <= getLastSeenCommentId()) return
  try {
    localStorage.setItem(LAST_SEEN_COMMENT_KEY, String(id))
  } catch {}
}

export function clearLastSeenComment() {
  try {
    localStorage.removeItem(LAST_SEEN_COMMENT_KEY)
  } catch {}
}
