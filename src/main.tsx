import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@/styles/fonts.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { router } from '@/routes/router'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'
import { isLoggedIn } from '@/utils/auth'
import { reloadOnceForChunkError } from '@/utils/chunkReload'
import { syncPushToken } from '@/utils/push'

window.addEventListener('vite:preloadError', (event) => {
  if (reloadOnceForChunkError()) event.preventDefault()
})

if (isLoggedIn()) void syncPushToken()

if (import.meta.env.DEV) {
  void import('@/utils/firebase').then(({ getCurrentFcmToken, listenForegroundMessage }) => {
    Object.assign(window, {
      testFcm: async () => {
        await Notification.requestPermission()
        const token = await getCurrentFcmToken()
        console.log('FCM token:', token)
        return token
      },
    })
    listenForegroundMessage((payload) => console.log('[FCM 포그라운드]', payload))
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
