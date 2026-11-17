import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { CommentAlert } from '@/components/common/CommentAlert/CommentAlert'
import { ROUTES } from '@/constants/routes'
import { MOCK_INCOMING_COMMENT } from '@/mocks/data'
import { preloadTabPages } from '@/routes/preloadTabPages'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    preloadTabPages()
  }, [])
  const isExplore = pathname.startsWith(ROUTES.explore)
  const [incomingComment, setIncomingComment] = useState<typeof MOCK_INCOMING_COMMENT | null>(
    MOCK_INCOMING_COMMENT,
  )

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
            navigate(ROUTES.exploreNotifications)
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
