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

export const getCurrentFcmToken = async (): Promise<string | null> => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return null
  if (!(await isSupported())) return null
  return getToken(getMessaging(app), {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  })
}

export const listenForegroundMessage = async (cb: (payload: MessagePayload) => void) => {
  if (!(await isSupported())) return () => {}
  return onMessage(getMessaging(app), cb)
}
