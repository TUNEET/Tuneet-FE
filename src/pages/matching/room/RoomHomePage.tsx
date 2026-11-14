import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { getRoomHome } from '@/apis/room'
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
import { useToast } from '@/hooks/useToast'
import type { RoomDetail } from '@/types/room'
import { MemberCarousel } from './components/MemberCarousel/MemberCarousel'
import { Playlist } from './components/Playlist/Playlist'
import { RoomHeader } from './components/RoomHeader/RoomHeader'
import * as S from './RoomHomePage.styles'

export function RoomHomePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { roomId } = useParams()
  const id = Number(roomId)
  const isValidId = Number.isInteger(id) && id > 0
  // undefined: 불러오는 중, null: 못 찾음 (없는 방이거나 멤버가 아님)
  const [room, setRoom] = useState<RoomDetail | null | undefined>(undefined)
  const goToMatching = () => navigate(ROUTES.matching)

  useEffect(() => {
    if (!isValidId) return
    let isStale = false

    getRoomHome(id)
      .then((data) => {
        if (!isStale) setRoom(data)
      })
      .catch((error) => {
        if (isStale) return
        setRoom(null)
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [id, isValidId, showToast])

  if (isValidId && room === undefined) return <SheetPage>{null}</SheetPage>

  if (!room) {
    return (
      <SheetPage>
        <SectionHeader title="방" actionLabel="나가기" onActionClick={goToMatching} />
        <S.Empty>방을 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
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
              <FeedCard key={feed.id} feed={feed} tone="purple" />
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
          <Playlist songs={room.playlist.slice(0, ROOM_HOME_PREVIEW_COUNT)} />
        ) : (
          <S.Empty>아직 담긴 노래가 없어요</S.Empty>
        )}
      </S.Section>
    </SheetPage>
  )
}
