import { useNavigate } from 'react-router'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath } from '@/constants/routes'
import { MOCK_ROOM_DETAIL } from '@/mocks/room'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import * as S from './RoomFeedsPage.styles'

export function RoomFeedsPage() {
  const navigate = useNavigate()
  const room = MOCK_ROOM_DETAIL
  const goToRoom = () => navigate(getRoomPath(room.id))

  return (
    <SheetPage>
      <RoomHeader name={room.name} description={room.description} onBackClick={goToRoom} />
      <SectionHeader title="피드" />
      <S.CardList>
        {room.feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} tone="purple" expanded />
        ))}
      </S.CardList>
    </SheetPage>
  )
}
