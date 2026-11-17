import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

/** 알림 권한 요청 후 FCM 토큰 발급. 실패하거나 거부되면 null */
export const requestFcmToken = async (): Promise<string | null> => {
  try {
    if (!(await isSupported())) return null

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return null

    const messaging = getMessaging(app)
    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    })
  } catch (e) {
    console.error('FCM 토큰 발급 실패', e)
    return null
  }
}

/** 이미 알림을 허용한 기기의 현재 토큰. 권한을 새로 묻지 않는다 */
export const getCurrentFcmToken = async (): Promise<string | null> => {
  try {
    if (!(await isSupported()) || Notification.permission !== 'granted') return null
    return await getToken(getMessaging(app), {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    })
  } catch (e) {
    console.error('FCM 토큰 조회 실패', e)
    return null
  }
}

/** 앱이 열려 있을 때(포그라운드) 받은 메시지 처리 */
export const listenForegroundMessage = async (cb: (title?: string, body?: string) => void) => {
  if (!(await isSupported())) return
  onMessage(getMessaging(app), (payload) => {
    cb(payload.notification?.title, payload.notification?.body)
  })
}
