import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@/styles/fonts.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { router } from '@/routes/router'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'
import { reloadOnceForChunkError } from '@/utils/chunkReload'

// 배포 직후 사라진 JS 파일을 불러오지 못하면 새로고침으로 최신 버전을 받는다
window.addEventListener('vite:preloadError', (event) => {
  if (reloadOnceForChunkError()) event.preventDefault()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
