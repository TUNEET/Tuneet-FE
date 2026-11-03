import { useNavigate } from 'react-router'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getUserProfilePath, ROUTES } from '@/constants/routes'
import { MOCK_LETTER_QUOTA, MOCK_ROOMS, MOCK_TASTE_MATCHES } from '@/mocks/data'
import { LetterSection } from './components/LetterSection/LetterSection'
import { RoomSection } from './components/RoomSection/RoomSection'
import * as S from './MatchingPage.styles'

export function MatchingPage() {
  const navigate = useNavigate()

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

      <LetterSection quota={MOCK_LETTER_QUOTA} />

      <Divider />

      <RoomSection rooms={MOCK_ROOMS} onCreateClick={() => navigate(ROUTES.createRoom)} />
    </SheetPage>
  )
}
