const LAST_SEEN_COMMENT_KEY = 'lastSeenCommentId'

// 이미 띄웠거나 알림 목록에서 본 코멘트는 다시 띄우지 않으려고 가장 최근에 본 id를 기억한다
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
  } catch {
    // 저장이 막힌 환경이면 다음 접속 때 다시 뜰 뿐이다
  }
}

export function clearLastSeenComment() {
  try {
    localStorage.removeItem(LAST_SEEN_COMMENT_KEY)
  } catch {
    // 지울 수 없으면 그대로 둔다
  }
}
