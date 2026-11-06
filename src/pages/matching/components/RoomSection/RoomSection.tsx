import { Button } from '@/components/common/Button/Button'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import type { Room } from '@/types/room'
import { RoomCard } from '../RoomCard/RoomCard'
import * as S from './RoomSection.styles'

type RoomSectionProps = {
  rooms: Room[]
  onRoomEnterClick?: (room: Room) => void
  onJoinInvitedClick?: () => void
  onCreateClick?: () => void
}

export function RoomSection({
  rooms,
  onRoomEnterClick,
  onJoinInvitedClick,
  onCreateClick,
}: RoomSectionProps) {
  return (
    <S.Wrapper>
      <SectionHeader title="나의 방" />
      <S.Content>
        <S.List>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onEnterClick={onRoomEnterClick} />
          ))}
        </S.List>
        <S.Actions>
          <Button variant="outline" onClick={onJoinInvitedClick}>
            초대받은 방 입장하기
          </Button>
          <Button onClick={onCreateClick}>새로운 방 만들기</Button>
        </S.Actions>
      </S.Content>
    </S.Wrapper>
  )
}
