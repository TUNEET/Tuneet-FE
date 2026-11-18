// 홈 화면 추가는 기기 단위라 계정이 아니라 이 기기에서 한 번만 안내한다
const HOME_SCREEN_GUIDE_KEY = 'homeScreenGuideSeen'

// 이미 홈 화면 앱으로 열었으면 안내할 필요가 없다
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

export function shouldShowHomeScreenGuide() {
  if (isStandalone()) return false
  try {
    return localStorage.getItem(HOME_SCREEN_GUIDE_KEY) === null
  } catch {
    return false
  }
}

export function markHomeScreenGuideSeen() {
  try {
    localStorage.setItem(HOME_SCREEN_GUIDE_KEY, 'true')
  } catch {
    // 저장이 막힌 환경이면 다음 접속 때 다시 뜰 뿐이다
  }
}
