import { useNavigate } from 'react-router'
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
import { MOCK_ROOM_DETAIL } from '@/mocks/room'
import { MemberCarousel } from './components/MemberCarousel/MemberCarousel'
import { Playlist } from './components/Playlist/Playlist'
import { RoomHeader } from './components/RoomHeader/RoomHeader'
import * as S from './RoomHomePage.styles'

export function RoomHomePage() {
  const navigate = useNavigate()
  const room = MOCK_ROOM_DETAIL

  return (
    <SheetPage>
      <RoomHeader
        name={room.name}
        description={room.description}
        onBackClick={() => navigate(ROUTES.matching)}
      />

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
        <S.CardList>
          {room.feeds.slice(0, ROOM_HOME_PREVIEW_COUNT).map((feed) => (
            <FeedCard key={feed.id} feed={feed} tone="purple" />
          ))}
        </S.CardList>
      </S.Section>

      <Divider />

      <S.Section>
        <SectionHeader
          title="플레이리스트"
          actionLabel="더보기"
          onActionClick={() => navigate(getRoomPlaylistPath(room.id))}
        />
        <Playlist songs={room.playlist.slice(0, ROOM_HOME_PREVIEW_COUNT)} />
      </S.Section>
    </SheetPage>
  )
}
