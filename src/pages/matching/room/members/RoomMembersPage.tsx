import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { getRoomMembers } from '@/apis/room'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterWritePath, getRoomPath, getUserProfilePath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { RoomMembers } from '@/types/room'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { MemberRow } from './components/MemberRow/MemberRow'
import * as S from './RoomMembersPage.styles'

export function RoomMembersPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { roomId } = useParams()
  const id = Number(roomId)
  const isValidId = Number.isInteger(id) && id > 0
  // undefined: 불러오는 중, null: 못 찾음 (없는 방이거나 멤버가 아님)
  const [room, setRoom] = useState<RoomMembers | null | undefined>(undefined)

  useEffect(() => {
    if (!isValidId) return
    let isStale = false

    getRoomMembers(id)
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
        <SectionHeader
          title="멤버"
          actionLabel="나가기"
          onActionClick={() => navigate(ROUTES.matching)}
        />
        <S.Empty>방을 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  return (
    <SheetPage>
      <RoomHeader
        name={room.name}
        description={room.description}
        onBackClick={() => navigate(getRoomPath(room.id))}
      />
      <SectionHeader title="멤버" />
      {room.members.length > 0 ? (
        <S.List>
          {room.members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onClick={() => navigate(getUserProfilePath(member.id))}
              onLetterClick={() => navigate(getLetterWritePath(member.id))}
            />
          ))}
        </S.List>
      ) : (
        <S.Empty>아직 다른 멤버가 없어요</S.Empty>
      )}
    </SheetPage>
  )
}
