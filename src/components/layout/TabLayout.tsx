import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { CommentAlert } from '@/components/common/CommentAlert/CommentAlert'
import { ROUTES } from '@/constants/routes'
import { getReceivedFeedMessages } from '@/apis/notification'
import { preloadTabPages } from '@/routes/preloadTabPages'
import type { ReceivedNotification } from '@/types/notification'
import { getLastSeenCommentId, markCommentSeen } from '@/utils/commentAlert'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    preloadTabPages()
  }, [])
  const isExplore = pathname.startsWith(ROUTES.explore)
  const [incomingComment, setIncomingComment] = useState<ReceivedNotification | null>(null)

  // 앱에 들어올 때 아직 안 본 새 코멘트가 있을 때만 알림을 띄운다
  useEffect(() => {
    let isStale = false

    getReceivedFeedMessages()
      .then(({ items }) => {
        const latest = items[0]
        if (isStale || !latest || latest.isRead || latest.id <= getLastSeenCommentId()) return
        setIncomingComment(latest)
      })
      .catch(() => {})

    return () => {
      isStale = true
    }
  }, [])

  const closeIncomingComment = () => {
    if (incomingComment) markCommentSeen(incomingComment.id)
    setIncomingComment(null)
  }

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
            closeIncomingComment()
            navigate(ROUTES.exploreNotifications)
          }}
          onClose={closeIncomingComment}
        />
      )}
    </>
  )
}

const Content = styled.div`
  padding-bottom: var(--bottom-nav-height);
`
