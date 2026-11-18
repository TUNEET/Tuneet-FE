// 회원가입을 마치면 남겨 두고, 그 뒤 처음 홈에 들어왔을 때 안내를 띄우고 지운다.
// 취향 설정을 끝내고 오든 건너뛰고 오든 홈에 처음 들어온 순간 뜬다
const HOME_SCREEN_GUIDE_PENDING_KEY = 'homeScreenGuidePending'

export function markHomeScreenGuidePending() {
  try {
    localStorage.setItem(HOME_SCREEN_GUIDE_PENDING_KEY, 'true')
  } catch {
    // 저장이 막힌 환경이면 안내만 건너뛴다
  }
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
  } catch {
    // 지울 수 없으면 다음 홈 진입 때 한 번 더 뜰 뿐이다
  }
}
