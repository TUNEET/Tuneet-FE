import { useCallback, useRef, useState } from 'react'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SegmentTabs } from '@/components/common/SegmentTabs/SegmentTabs'
import { useToast } from '@/hooks/useToast'
import { MOCK_NOTIFICATIONS, MOCK_SENT_NOTIFICATIONS } from '@/mocks/data'
import * as S from '@/pages/explore/ExplorePage.styles'
import { formatTimeAgo } from '@/utils/format'

type CommentTab = 'received' | 'sent'

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
  const [notificationsByTab, setNotificationsByTab] = useState({
    received: MOCK_NOTIFICATIONS,
    sent: MOCK_SENT_NOTIFICATIONS,
  })
  const [isClearOpen, setIsClearOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const notifications =
    tab === 'received'
      ? notificationsByTab.received.map(({ senderNickname, ...rest }) => ({
          ...rest,
          nickname: senderNickname,
        }))
      : notificationsByTab.sent.map(({ receiverNickname, ...rest }) => ({
          ...rest,
          nickname: receiverNickname,
        }))
  const isEmpty = notifications.length === 0

  const handleTabChange = (next: CommentTab) => {
    closeClear()
    setTab(next)
  }

  const handleClear = () => {
    closeClear()
    setNotificationsByTab((prev) => ({ ...prev, [tab]: [] }))
    showToast(TAB_TEXT[tab].toast)
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
            <S.Empty>{TAB_TEXT[tab].empty}</S.Empty>
          ) : (
            <S.CardList>
              {notifications.map(({ id, nickname, message, song, createdAt }) => (
                <MusicCard
                  key={id}
                  tone="blue"
                  nickname={nickname}
                  meta={formatTimeAgo(createdAt)}
                  image={song.albumImageUrl}
                  title={message}
                  description={`${song.title} - ${song.artist}`}
                  playable
                />
              ))}
            </S.CardList>
          )}
        </S.Section>
      </S.ExploreSheet>
    </S.Page>
  )
}
