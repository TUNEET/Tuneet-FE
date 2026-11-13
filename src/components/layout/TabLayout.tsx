import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { CommentAlert } from '@/components/common/CommentAlert/CommentAlert'
import { ROUTES } from '@/constants/routes'
import { MOCK_INCOMING_COMMENT } from '@/mocks/data'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()
  const isExplore = pathname.startsWith(ROUTES.explore)
  // TODO: 실시간 알림(SSE/웹소켓 등) 연동 시 새 코멘트 수신 이벤트로 교체
  const [incomingComment, setIncomingComment] = useState<typeof MOCK_INCOMING_COMMENT | null>(
    MOCK_INCOMING_COMMENT,
  )

  // 열려 있는 페이지의 아이콘을 다시 누르면 이전 화면으로 닫기
  const toggle = (target: string, fallback: string) => {
    if (pathname !== target) {
      navigate(target)
      return
    }

    if (key !== 'default') {
      navigate(-1)
      return
    }

    navigate(fallback, { replace: true })
  }

  return (
    <>
      {isExplore ? (
        <Header
          action="notification"
          onActionClick={() => toggle(ROUTES.exploreNotifications, ROUTES.explore)}
        />
      ) : (
        <Header action="message" onActionClick={() => toggle(ROUTES.letterbox, ROUTES.matching)} />
      )}
      <Content>
        <Outlet />
      </Content>
      <BottomNav />
      {incomingComment && (
        <CommentAlert
          nickname={incomingComment.senderNickname}
          createdAt={incomingComment.createdAt}
          onConfirm={() => {
            setIncomingComment(null)
            navigate(ROUTES.letterbox)
          }}
          onClose={() => setIncomingComment(null)}
        />
      )}
    </>
  )
}

const Content = styled.div`
  padding-bottom: var(--bottom-nav-height);
`
