import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'
import type { MessagePayload } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

/** 알림을 허용한 기기의 FCM 토큰. 권한은 묻지 않고, 허용 전이거나 미지원이면 null */
export const getCurrentFcmToken = async (): Promise<string | null> => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return null
  if (!(await isSupported())) return null
  return getToken(getMessaging(app), {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  })
}

/** 앱이 열려 있을 때(포그라운드) 받은 메시지 처리. 구독을 끊는 함수를 돌려준다 */
export const listenForegroundMessage = async (cb: (payload: MessagePayload) => void) => {
  if (!(await isSupported())) return () => {}
  return onMessage(getMessaging(app), cb)
}
