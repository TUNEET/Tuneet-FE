import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import { ToastProvider } from '@/components/common/Toast/ToastProvider'
import { useAppHeight } from '@/hooks/useAppHeight'
import { FRAME_BREAKPOINT, FRAME_MAX_WIDTH } from '@/styles/layout'
import { SplashScreen } from './SplashScreen'

const SPLASH_DURATION_MS = 2000

export function MobileLayout() {
  useAppHeight()

  const [isSplashVisible, setIsSplashVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), SPLASH_DURATION_MS)

    return () => clearTimeout(timer)
  }, [])

  return (
    <PageFrame>
      <PhoneFrame>
        {isSplashVisible ? (
          <SplashScreen />
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
