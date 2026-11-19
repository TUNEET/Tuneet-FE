import { useCallback, useEffect, useRef, useState } from 'react'
import { getApiError } from '@/apis/error'
import { deleteAllSentFeedMessages, getSentFeedMessages } from '@/apis/feed'
import { deleteAllNotifications, getReceivedFeedMessages } from '@/apis/notification'
import { getMyProfile } from '@/apis/user'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SegmentTabs } from '@/components/common/SegmentTabs/SegmentTabs'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import replyIcon from '@/assets/icons/repplyy.svg'
import { FeedDetailModal } from '@/pages/explore/components/FeedDetailModal/FeedDetailModal'
import * as S from '@/pages/explore/ExplorePage.styles'
import type { ReceivedNotification, SentNotification } from '@/types/notification'
import { markCommentSeen } from '@/utils/commentAlert'
import { formatTimeAgo } from '@/utils/format'

type CommentTab = 'received' | 'sent'

const getNotificationId = ({ id }: ReceivedNotification | SentNotification) => id

const TABS = [
  { value: 'received', label: '받은 코멘트' },
  { value: 'sent', label: '보낸 코멘트' },
] as const

const TAB_TEXT: Record<CommentTab, { confirm: string; toast: string; empty: string }> = {
  received: {
    confirm: '받은 코멘트를 모두 삭제하시겠어요?',
    toast: '받은 코멘트를 모두 삭제했어요',
    empty: '받은 코멘트가 없어요',
  },
  sent: {
    confirm: '보낸 코멘트를 모두 삭제하시겠어요?',
    toast: '보낸 코멘트를 모두 삭제했어요',
    empty: '보낸 코멘트가 없어요',
  },
}

export function NotificationsPage() {
  const showToast = useToast()
  const [tab, setTab] = useState<CommentTab>('received')
  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const received = useCursorList(getReceivedFeedMessages, getNotificationId, handleLoadError)
  const sent = useCursorList(getSentFeedMessages, getNotificationId, handleLoadError)
  const current = tab === 'received' ? received : sent
  const latestReceivedId = received.items[0]?.id

  useEffect(() => {
    if (!latestReceivedId) return
    getMyProfile()
      .then(({ userId }) => markCommentSeen(userId, latestReceivedId))
      .catch(() => {})
  }, [latestReceivedId])
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    current.loadMore,
    current.hasNext && !current.isLoading,
  )
  const handleLikeToggle = useMusicLike((update) => {
    received.setItems(update)
    sent.setItems(update)
  })
  const [isClearOpen, setIsClearOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const notifications =
    tab === 'received'
      ? received.items.map(({ senderNickname, ...rest }) => ({
          ...rest,
          nickname: senderNickname,
        }))
      : sent.items.map(({ receiverNickname, ...rest }) => ({
          ...rest,
          nickname: receiverNickname,
        }))
  const isEmpty = notifications.length === 0
  // 누른 코멘트를 게시물 상세와 같은 모달로 보여 준다
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = notifications.find(({ id }) => id === selectedId) ?? null
  const isLoading = current.isLoading

  // TODO: 백엔드가 알림에 senderId를 주면 보낸 사람에게 편지 쓰기로 연결한다
  const handleReply = () => showToast('답장 기능을 준비하고 있어요')

  const handleTabChange = (next: CommentTab) => {
    closeClear()
    setSelectedId(null)
    setTab(next)
  }

  const handleClear = async () => {
    closeClear()
    try {
      if (tab === 'sent') {
        await deleteAllSentFeedMessages()
        sent.setItems([])
      } else {
        await deleteAllNotifications()
        received.setItems([])
      }
      showToast(TAB_TEXT[tab].toast)
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="20.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="27.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="28.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.ExploreSheet>
        <S.Section>
          <S.NotificationHeader ref={headerRef}>
            <SectionHeader
              title="알림"
              actionLabel="전체삭제"
              onActionClick={() => setIsClearOpen((prev) => !prev)}
              actionDisabled={isEmpty}
            />
            <ConfirmPopover
              open={isClearOpen && !isEmpty}
              message={TAB_TEXT[tab].confirm}
              confirmLabel="전체삭제"
              onConfirm={handleClear}
              onClose={closeClear}
              anchorRef={headerRef}
              surface="sheet"
              tone="danger"
            />
          </S.NotificationHeader>
          <SegmentTabs items={TABS} value={tab} onChange={handleTabChange} ariaLabel="알림 구분" />
          {isEmpty ? (
            !isLoading && <S.Empty>{TAB_TEXT[tab].empty}</S.Empty>
          ) : (
            <S.CardList>
              {notifications.map((notification) => {
                const { id, nickname, message, song, createdAt } = notification
                return (
                  <MusicCard
                    key={id}
                    tone="blue"
                    nickname={nickname}
                    meta={formatTimeAgo(createdAt)}
                    image={song.albumImageUrl}
                    title={message}
                    description={`${song.title} - ${song.artist}`}
                    playable
                    action={
                      tab === 'received' && (
                        <button
                          type="button"
                          aria-label="답장"
                          onClick={(event) => {
                            // 카드를 눌렀을 때처럼 상세가 열리지 않게 막는다
                            event.stopPropagation()
                            handleReply()
                          }}
                        >
                          <img src={replyIcon} alt="" width={20} height={19} />
                        </button>
                      )
                    }
                    onClick={() => setSelectedId(id)}
                  />
                )
              })}
            </S.CardList>
          )}
          <div ref={sentinelRef} aria-hidden />
        </S.Section>
      </S.ExploreSheet>

      {selected && (
        <FeedDetailModal
          feed={{
            id: selected.id,
            nickname: selected.nickname,
            song: selected.song,
            content: selected.message,
            createdAt: selected.createdAt,
          }}
          liked={selected.liked}
          onLikeToggle={() => handleLikeToggle(selected)}
          commentable={false}
          onReply={tab === 'received' ? handleReply : undefined}
          comments={selected.feedId !== null ? { feedId: selected.feedId, kind: tab } : undefined}
          onClose={() => setSelectedId(null)}
        />
      )}
    </S.Page>
  )
}
