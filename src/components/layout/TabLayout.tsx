import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { CommentAlert } from '@/components/common/CommentAlert/CommentAlert'
import { ROUTES } from '@/constants/routes'
import { getReceivedFeedMessages } from '@/apis/notification'
import { getMyProfile } from '@/apis/user'
import { preloadTabPages } from '@/routes/preloadTabPages'
import type { ReceivedNotification } from '@/types/notification'
import { getLastSeenCommentId, markCommentSeen } from '@/utils/commentAlert'
import { hasSeenWelcomeGuide, markWelcomeGuideSeen } from '@/utils/welcomeGuide'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    preloadTabPages()
  }, [])
  const isExplore = pathname.startsWith(ROUTES.explore)
  const [incomingComment, setIncomingComment] = useState<{
    userId: number
    comment: ReceivedNotification
  } | null>(null)

  useEffect(() => {
    let isStale = false

    Promise.all([getMyProfile(), getReceivedFeedMessages()])
      .then(([{ userId }, { items }]) => {
        const latest = items[0]
        if (isStale || !latest || latest.isRead) return
        if (latest.id <= getLastSeenCommentId(userId)) return
        setIncomingComment({ userId, comment: latest })
      })
      .catch(() => {})

    return () => {
      isStale = true
    }
  }, [])

  const [welcomeHintUserId, setWelcomeHintUserId] = useState<number | null>(null)
  const isOnLetterbox = pathname.startsWith(ROUTES.letterbox)

  useEffect(() => {
    let isStale = false

    getMyProfile()
      .then(({ userId }) => {
        if (!isStale && !hasSeenWelcomeGuide(userId)) setWelcomeHintUserId(userId)
      })
      .catch(() => {})

    return () => {
      isStale = true
    }
  }, [])

  useEffect(() => {
    if (welcomeHintUserId !== null && isOnLetterbox) markWelcomeGuideSeen(welcomeHintUserId)
  }, [welcomeHintUserId, isOnLetterbox])

  const isWelcomeHintShown =
    welcomeHintUserId !== null && !isOnLetterbox && !hasSeenWelcomeGuide(welcomeHintUserId)

  const closeWelcomeHint = () => {
    if (welcomeHintUserId !== null) markWelcomeGuideSeen(welcomeHintUserId)
    setWelcomeHintUserId(null)
  }

  const closeIncomingComment = () => {
    if (incomingComment) markCommentSeen(incomingComment.userId, incomingComment.comment.id)
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
        <Header
          action="message"
          onActionClick={() => toggle(ROUTES.letterbox, ROUTES.matching)}
          hint={isWelcomeHintShown ? '편지함을 확인해 보세요!' : undefined}
          onHintClose={closeWelcomeHint}
        />
      )}
      <Content>
        <Outlet />
      </Content>
      <BottomNav />
      {incomingComment && (
        <CommentAlert
          nickname={incomingComment.comment.senderNickname}
          createdAt={incomingComment.comment.createdAt}
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
