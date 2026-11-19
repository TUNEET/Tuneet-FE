import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { NotificationAlert } from '@/components/common/NotificationAlert/NotificationAlert'
import { ROUTES } from '@/constants/routes'
import { getReceivedFeedMessages } from '@/apis/notification'
import { getMyProfile } from '@/apis/user'
import { preloadTabPages } from '@/routes/preloadTabPages'
import type { ReceivedNotification } from '@/types/notification'
import { getLastSeenCommentId, markCommentSeen } from '@/utils/commentAlert'
import { getInviteJoinPath, takePendingInviteCode } from '@/utils/invite'
import { ALERT_COPY, isFeedAlertKind, toPushAlert } from '@/utils/pushAlert'
import type { PushAlert } from '@/utils/pushAlert'
import { hasSeenWelcomeGuide, markWelcomeGuideSeen } from '@/utils/welcomeGuide'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    preloadTabPages()
  }, [])

  useEffect(() => {
    const inviteCode = takePendingInviteCode()
    if (inviteCode) navigate(getInviteJoinPath(inviteCode))
  }, [navigate])
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

  // 앱을 보고 있을 때 온 푸시는 FCM이 띄우지 않아서 카드로 직접 보여준다
  const [pushAlert, setPushAlert] = useState<PushAlert | null>(null)

  useEffect(() => {
    if (!('Notification' in window)) return
    let unsubscribe: (() => void) | undefined
    let isStale = false

    // firebase는 무거워서 화면이 뜬 뒤에 불러온다
    void import('@/utils/firebase')
      .then(({ listenForegroundMessage }) => {
        if (isStale) return
        unsubscribe = listenForegroundMessage((payload) => {
          void toPushAlert(payload).then((alert) => {
            if (!isStale) setPushAlert(alert)
          })
        })
      })
      .catch(() => {})

    return () => {
      isStale = true
      unsubscribe?.()
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
      {pushAlert ? (
        <NotificationAlert
          key={`${pushAlert.kind}-${pushAlert.createdAt}`}
          title={pushAlert.title}
          nickname={pushAlert.nickname}
          createdAt={pushAlert.createdAt}
          confirmLabel={pushAlert.confirmLabel}
          onConfirm={() => {
            setPushAlert(null)
            navigate(
              pushAlert.path ??
                (isFeedAlertKind(pushAlert.kind) ? ROUTES.exploreNotifications : ROUTES.letterbox),
            )
          }}
          onClose={() => setPushAlert(null)}
        />
      ) : (
        incomingComment && (
          <NotificationAlert
            {...ALERT_COPY[incomingComment.comment.kind === 'reply' ? 'commentReply' : 'comment']}
            nickname={incomingComment.comment.senderNickname}
            createdAt={incomingComment.comment.createdAt}
            onConfirm={() => {
              closeIncomingComment()
              navigate(ROUTES.exploreNotifications)
            }}
            onClose={closeIncomingComment}
          />
        )
      )}
    </>
  )
}

const Content = styled.div`
  padding-bottom: var(--bottom-nav-height);
`
