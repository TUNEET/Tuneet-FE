import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import { ToastProvider } from '@/components/common/Toast/ToastProvider'
import { useAppHeight } from '@/hooks/useAppHeight'
import { FRAME_BREAKPOINT, FRAME_MAX_WIDTH } from '@/styles/layout'
import { SplashScreen } from './SplashScreen'

const SPLASH_DURATION_MS = 2000
const SPLASH_SEEN_KEY = 'splashSeen'

/** 스플래시는 브라우저 세션(탭/PWA 실행)당 한 번만 보여준다. 새로고침 시에는 생략 */
function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) !== null
  } catch {
    return false
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_SEEN_KEY, 'true')
  } catch {
    // 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)에서는 매번 보여준다
  }
}

export function MobileLayout() {
  useAppHeight()

  const [isSplashVisible, setIsSplashVisible] = useState(() => !hasSeenSplash())

  const hideSplash = () => {
    markSplashSeen()
    setIsSplashVisible(false)
  }

  useEffect(() => {
    if (!isSplashVisible) return

    const timer = setTimeout(hideSplash, SPLASH_DURATION_MS)

    return () => clearTimeout(timer)
  }, [isSplashVisible])

  return (
    <PageFrame>
      <PhoneFrame>
        {isSplashVisible ? (
          <SplashScreen onSkip={hideSplash} />
        ) : (
          <ToastProvider>
            <ScrollArea>
              <Outlet />
            </ScrollArea>
          </ToastProvider>
        )}
      </PhoneFrame>
    </PageFrame>
  )
}

const PageFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: var(--app-height, 100dvh);
  background-color: #2e2e2e;
`

const PhoneFrame = styled.div`
  position: relative;
  width: 100%;
  height: var(--app-height, 100dvh);
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  transform: translateZ(0);

  ${FRAME_BREAKPOINT} {
    width: min(${FRAME_MAX_WIDTH}, 100vw);
    height: var(--frame-height);
  }
`

const ScrollArea = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
