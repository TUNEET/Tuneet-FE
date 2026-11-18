import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { leaveRoom } from '@/apis/room'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Divider } from '@/components/common/Divider/Divider'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROOM_HOME_PREVIEW_COUNT } from '@/constants/room'
import {
  getRoomFeedsPath,
  getRoomMembersPath,
  getRoomPlaylistPath,
  ROUTES,
} from '@/constants/routes'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import { MemberCarousel } from './components/MemberCarousel/MemberCarousel'
import { Playlist } from './components/Playlist/Playlist'
import { RoomHeader } from './components/RoomHeader/RoomHeader'
import { useRoomHome } from './hooks/useRoomHome'
import * as S from './RoomHomePage.styles'

export function RoomHomePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { room, isLoading, updateLikes } = useRoomHome()
  const handleLikeToggle = useMusicLike(updateLikes)
  const goToMatching = () => navigate(ROUTES.matching)
  const [isLeaveOpen, setIsLeaveOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const leaveButtonRef = useRef<HTMLButtonElement>(null)
  const closeLeave = useCallback(() => setIsLeaveOpen(false), [])

  if (isLoading) return <SheetPage>{null}</SheetPage>

  if (!room) {
    return (
      <SheetPage>
        <SectionHeader title="방" actionLabel="나가기" onActionClick={goToMatching} />
        <S.Empty>방을 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const handleLeave = async () => {
    if (isLeaving) return
    closeLeave()
    setIsLeaving(true)
    try {
      await leaveRoom(room.id)
      showToast('방에서 나갔어요')
      navigate(ROUTES.matching, { replace: true })
    } catch (error) {
      showToast(getApiError(error).message)
      setIsLeaving(false)
    }
  }

  return (
    <SheetPage>
      <RoomHeader name={room.name} description={room.description} onBackClick={goToMatching} />

      <S.Section>
        <SectionHeader
          title="멤버"
          actionLabel="전체보기"
          onActionClick={() => navigate(getRoomMembersPath(room.id))}
        />
        <MemberCarousel members={room.members} />
      </S.Section>

      <Divider />

      <S.Section>
        <SectionHeader
          title="피드"
          actionLabel="더보기"
          onActionClick={() => navigate(getRoomFeedsPath(room.id))}
        />
        {room.feeds.length > 0 ? (
          <S.CardList>
            {room.feeds.slice(0, ROOM_HOME_PREVIEW_COUNT).map((feed) => (
              <FeedCard
                key={feed.id}
                feed={feed}
                tone="purple"
                liked={feed.liked}
                onLikeToggle={() => handleLikeToggle(feed)}
              />
            ))}
          </S.CardList>
        ) : (
          <S.Empty>아직 올라온 피드가 없어요</S.Empty>
        )}
      </S.Section>

      <Divider />

      <S.Section>
        <SectionHeader
          title="플레이리스트"
          actionLabel="더보기"
          onActionClick={() => navigate(getRoomPlaylistPath(room.id))}
        />
        {room.playlist.length > 0 ? (
          <Playlist
            songs={room.playlist.slice(0, ROOM_HOME_PREVIEW_COUNT)}
            onLikeToggle={handleLikeToggle}
          />
        ) : (
          <S.Empty>아직 담긴 노래가 없어요</S.Empty>
        )}
      </S.Section>

      <S.LeaveArea>
        <S.LeaveButton
          ref={leaveButtonRef}
          type="button"
          aria-expanded={isLeaveOpen}
          disabled={isLeaving}
          onClick={() => setIsLeaveOpen((prev) => !prev)}
        >
          나가기
        </S.LeaveButton>
        <ConfirmPopover
          open={isLeaveOpen}
          message="방에서 나가시겠어요?"
          confirmLabel="방 나가기"
          onConfirm={handleLeave}
          onClose={closeLeave}
          anchorRef={leaveButtonRef}
          placement="top"
        />
      </S.LeaveArea>
    </SheetPage>
  )
}
