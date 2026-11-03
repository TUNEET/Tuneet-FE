import { Outlet } from 'react-router'
import styled from 'styled-components'
import { useAppHeight } from '@/hooks/useAppHeight'
import { FRAME_BREAKPOINT, FRAME_MAX_WIDTH } from '@/styles/layout'

export function MobileLayout() {
  useAppHeight()

  return (
    <PageFrame>
      <PhoneFrame>
        <ScrollArea>
          <Outlet />
        </ScrollArea>
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
