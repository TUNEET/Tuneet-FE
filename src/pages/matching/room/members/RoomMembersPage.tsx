import { useNavigate } from 'react-router'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath, getUserProfilePath } from '@/constants/routes'
import { MOCK_ROOM_DETAIL } from '@/mocks/room'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { MemberRow } from './components/MemberRow/MemberRow'
import * as S from './RoomMembersPage.styles'

export function RoomMembersPage() {
  const navigate = useNavigate()
  const room = MOCK_ROOM_DETAIL
  const goToRoom = () => navigate(getRoomPath(room.id))

  return (
    <SheetPage>
      <RoomHeader name={room.name} description={room.description} onBackClick={goToRoom} />
      <SectionHeader title="멤버" />
      <S.List>
        {room.members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onClick={() => navigate(getUserProfilePath(member.id))}
          />
        ))}
      </S.List>
    </SheetPage>
  )
}
