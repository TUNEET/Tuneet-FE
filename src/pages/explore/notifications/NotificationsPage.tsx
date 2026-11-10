import { useCallback, useRef, useState } from 'react'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { useToast } from '@/hooks/useToast'
import { MOCK_NOTIFICATIONS } from '@/mocks/data'
import * as S from '@/pages/explore/ExplorePage.styles'
import { formatTimeAgo } from '@/utils/format'

export function NotificationsPage() {
  const showToast = useToast()
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [isClearOpen, setIsClearOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const isEmpty = notifications.length === 0

  const handleClear = () => {
    closeClear()
    setNotifications([])
    showToast('알림을 모두 삭제했어요')
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
            />
            <ConfirmPopover
              open={isClearOpen}
              message={isEmpty ? '삭제할 알림이 없어요.' : '모든 알림을 삭제하시겠어요?'}
              confirmLabel={isEmpty ? '닫기' : '전체삭제'}
              onConfirm={isEmpty ? closeClear : handleClear}
              onClose={closeClear}
              anchorRef={headerRef}
              surface="sheet"
              tone={isEmpty ? 'muted' : 'danger'}
            />
          </S.NotificationHeader>
          {isEmpty ? (
            <S.Empty>받은 알림이 없어요</S.Empty>
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
