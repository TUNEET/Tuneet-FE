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

type ForegroundListener = (payload: MessagePayload) => void

type ServiceWorkerPushPayload = {
  data?: Record<string, string>
  notification?: MessagePayload['notification']
  fcmMessageId?: string
  from?: string
  collapse_key?: string
}

const SERVICE_WORKER_PUSH_TYPE = 'TUNEET_PUSH'

const foregroundListeners = new Set<ForegroundListener>()
const handledMessageIds = new Set<string>()
let foregroundSubscription: Promise<void> | null = null

const notifyForeground = (payload: MessagePayload) => {
  if (payload.messageId) {
    if (handledMessageIds.has(payload.messageId)) return
    handledMessageIds.add(payload.messageId)
  }
  foregroundListeners.forEach((listener) => listener(payload))
}

const toMessagePayload = (push: ServiceWorkerPushPayload): MessagePayload => ({
  data: push.data,
  notification: push.notification,
  messageId: push.fcmMessageId ?? '',
  from: push.from ?? '',
  collapseKey: push.collapse_key ?? '',
})

const listenServiceWorkerPush = () => {
  if (!('serviceWorker' in navigator)) return
  navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
    const message = event.data as { type?: string; payload?: ServiceWorkerPushPayload } | null
    if (message?.type !== SERVICE_WORKER_PUSH_TYPE || !message.payload) return
    if (document.visibilityState !== 'visible') return
    notifyForeground(toMessagePayload(message.payload))
  })
  navigator.serviceWorker.startMessages()
}

const subscribeForeground = () => {
  foregroundSubscription ??= isSupported().then((supported) => {
    if (!supported) return
    onMessage(getMessaging(app), notifyForeground)
    listenServiceWorkerPush()
  })
  return foregroundSubscription
}

export const listenForegroundMessage = (listener: ForegroundListener) => {
  foregroundListeners.add(listener)
  void subscribeForeground()
  return () => {
    foregroundListeners.delete(listener)
  }
}
