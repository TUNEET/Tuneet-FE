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

self.addEventListener('push', (event) => {
  let payload = null
  try {
    payload = event.data ? event.data.json() : null
  } catch {
    payload = null
  }
  if (!payload) return

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => client.postMessage({ type: 'TUNEET_PUSH', payload }))
    }),
  )
})

firebase.messaging()
