// 알림 클릭은 Firebase 기본 처리보다 먼저 직접 처리한다.
// Firebase는 data.link를 읽지 않고, 도메인이 조금만 달라도 링크를 무시하며,
// 앱이 다른 화면에 켜져 있으면 이동하지 못해서 상세로 이어지지 않는다.
// Firebase보다 먼저 등록해야 이 리스너가 먼저 실행된다
const NAVIGATE_MESSAGE = 'TUNEET_PUSH_NAVIGATE'

const getPushLink = (notification) => {
  const payload = notification.data && notification.data.FCM_MSG
  if (!payload) return null
  return (
    (payload.data && payload.data.link) ||
    (payload.fcmOptions && payload.fcmOptions.link) ||
    (payload.notification && payload.notification.click_action) ||
    null
  )
}

// 링크의 도메인과 상관없이 경로만 꺼내 지금 앱의 도메인에서 연다
const toAppPath = (link) => {
  try {
    const url = new URL(link, self.location.origin)
    return url.pathname + url.search + url.hash
  } catch {
    return '/'
  }
}

self.addEventListener('notificationclick', (event) => {
  const link = getPushLink(event.notification)
  if (!link) return

  event.stopImmediatePropagation()
  event.notification.close()
  const path = toAppPath(link)

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const appWindow = windows.find(
        (client) => new URL(client.url).origin === self.location.origin,
      )

      // 앱이 켜져 있으면 앞으로 가져와서 앱 안에서 이동시킨다
      if (appWindow) {
        await appWindow.focus()
        appWindow.postMessage({ type: NAVIGATE_MESSAGE, path })
        return
      }
      await self.clients.openWindow(path)
    })(),
  )
})

importScripts('https://www.gstatic.com/firebasejs/13.4.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/13.4.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyC7jemed6AWv3Q0q9J6sUUWcKsM-721Yqo',
  authDomain: 'tuneet-bdcd4.firebaseapp.com',
  projectId: 'tuneet-bdcd4',
  storageBucket: 'tuneet-bdcd4.firebasestorage.app',
  messagingSenderId: '199977745871',
  appId: '1:199977745871:web:e726af550232ee7b1de6ba',
})

firebase.messaging()
