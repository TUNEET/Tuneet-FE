import { deleteFcmToken, registerFcmToken } from '@/apis/notification'

// 서버는 ON/OFF를 저장하지 않아서 이 기기에서 켰는지는 여기서 기억한다
const PUSH_ENABLED_KEY = 'pushEnabled'

// firebase는 무거워서 푸시를 다룰 때만 불러온다
const loadFirebase = () => import('./firebase')

export function isPushEnabled() {
  return localStorage.getItem(PUSH_ENABLED_KEY) !== null
}

/** 권한을 받고 토큰을 서버에 등록한다. 권한 거부나 미지원 기기면 false */
export async function enablePush() {
  const { requestFcmToken } = await loadFirebase()
  const token = await requestFcmToken()
  if (!token) return false

  await registerFcmToken(token)
  localStorage.setItem(PUSH_ENABLED_KEY, 'true')
  return true
}

/** 서버에서 이 기기 토큰을 지운다. 실패하면 켜진 상태를 그대로 둔다 */
export async function disablePush() {
  const { getCurrentFcmToken } = await loadFirebase()
  const token = await getCurrentFcmToken()
  if (token) await deleteFcmToken(token)
  localStorage.removeItem(PUSH_ENABLED_KEY)
}

/** 토큰은 FCM이 바꿀 수 있어서 앱을 열 때마다 현재 토큰을 다시 등록한다 */
export async function syncPushToken() {
  if (!isPushEnabled()) return
  try {
    const { getCurrentFcmToken } = await loadFirebase()
    const token = await getCurrentFcmToken()
    // 브라우저 설정에서 알림을 막았으면 켜 둔 상태도 의미가 없다
    if (!token) {
      localStorage.removeItem(PUSH_ENABLED_KEY)
      return
    }
    await registerFcmToken(token)
  } catch (e) {
    console.error('FCM 토큰 재등록 실패', e)
  }
}

/** 로그아웃 때 다른 계정 알림이 이 기기로 오지 않게 토큰을 지운다 */
export async function clearPushOnLogout() {
  if (!isPushEnabled()) return
  try {
    await disablePush()
  } catch {
    localStorage.removeItem(PUSH_ENABLED_KEY)
  }
}
