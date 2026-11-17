import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { PAGE_DATA } from '@/apis/pageData'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { RecommendationList } from '@/components/common/RecommendationList/RecommendationList'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath, getUserProfilePath, ROUTES } from '@/constants/routes'
import { useLetterQuota } from '@/hooks/useLetterQuota'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useToast } from '@/hooks/useToast'
import type { Room } from '@/types/room'
import { takePrefetched } from '@/utils/prefetch'
import { LetterSection } from './components/LetterSection/LetterSection'
import { RoomSection } from './components/RoomSection/RoomSection'
import * as S from './MatchingPage.styles'

const MATCHING_RECOMMENDATION_COUNT = 2

export function MatchingPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const letterQuota = useLetterQuota()
  const [rooms, setRooms] = useState<Room[]>([])
  const { state: recommendations } = useRecommendations()

  useEffect(() => {
    let isStale = false

    takePrefetched(PAGE_DATA.myRooms)
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
        <RecommendationList
          state={recommendations}
          limit={MATCHING_RECOMMENDATION_COUNT}
          onUserClick={(match) => navigate(getUserProfilePath(match.id))}
        />
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
