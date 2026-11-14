import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { getMyRooms } from '@/apis/room'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath, getUserProfilePath, ROUTES } from '@/constants/routes'
import { useLetterQuota } from '@/hooks/useLetterQuota'
import { useToast } from '@/hooks/useToast'
import { MOCK_TASTE_MATCHES } from '@/mocks/data'
import type { Room } from '@/types/room'
import { LetterSection } from './components/LetterSection/LetterSection'
import { RoomSection } from './components/RoomSection/RoomSection'
import * as S from './MatchingPage.styles'

export function MatchingPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const letterQuota = useLetterQuota()
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    let isStale = false

    getMyRooms()
      .then((data) => {
        if (!isStale) setRooms(data)
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  return (
    <SheetPage>
      <S.Section>
        <SectionHeader
          title="매칭 | 나와 음악 취향이 닮은 사람들"
          actionLabel="더보기"
          onActionClick={() => navigate(ROUTES.recommendedUsers)}
        />
        <S.CardList>
          {MOCK_TASTE_MATCHES.map((match) => (
            <TasteMatchCard
              key={match.id}
              match={match}
              onClick={() => navigate(getUserProfilePath(match.id))}
            />
          ))}
        </S.CardList>
      </S.Section>

      <Divider />

      <LetterSection
        quota={letterQuota}
        onWriteClick={() => navigate(ROUTES.anonymousLetterWrite)}
      />

      <Divider />

      <RoomSection
        rooms={rooms}
        onRoomEnterClick={(room) => navigate(getRoomPath(room.id))}
        onJoinInvitedClick={() => navigate(ROUTES.joinRoom)}
        onCreateClick={() => navigate(ROUTES.createRoom)}
      />
    </SheetPage>
  )
}
