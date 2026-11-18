import { deleteFcmToken, registerFcmToken } from '@/apis/notification'

const PUSH_ENABLED_KEY = 'pushEnabled'

const loadFirebase = () => import('./firebase')

export function isPushEnabled() {
  return localStorage.getItem(PUSH_ENABLED_KEY) !== null
}

export type EnablePushResult = 'enabled' | 'denied' | 'unsupported'

const canUseWebPush = () =>
  'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window

export async function enablePush(): Promise<EnablePushResult> {
  if (!canUseWebPush()) return 'unsupported'
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return 'denied'

  const { getCurrentFcmToken } = await loadFirebase()
  const token = await getCurrentFcmToken()
  if (!token) return 'unsupported'

  await registerFcmToken(token)
  localStorage.setItem(PUSH_ENABLED_KEY, 'true')
  return 'enabled'
}

export async function disablePush() {
  const { getCurrentFcmToken } = await loadFirebase()
  const token = await getCurrentFcmToken()
  if (token) await deleteFcmToken(token)
  localStorage.removeItem(PUSH_ENABLED_KEY)
}

export async function syncPushToken() {
  if (!isPushEnabled()) return
  try {
    if (!canUseWebPush()) throw new Error('웹 푸시 미지원')
    const { getCurrentFcmToken } = await loadFirebase()
    const token = await getCurrentFcmToken()
    if (!token) {
      localStorage.removeItem(PUSH_ENABLED_KEY)
      return
    }
    await registerFcmToken(token)
  } catch (e) {
    console.error('FCM 토큰 재등록 실패', e)
  }
}

export async function clearPushOnLogout() {
  if (!isPushEnabled()) return
  try {
    await disablePush()
  } catch {
    localStorage.removeItem(PUSH_ENABLED_KEY)
  }
}
