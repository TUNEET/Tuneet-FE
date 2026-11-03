import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { MOCK_LETTER_QUOTA, MOCK_ROOMS, MOCK_TASTE_MATCHES } from '@/mocks/data'
import { LetterSection } from './components/LetterSection/LetterSection'
import { RoomSection } from './components/RoomSection/RoomSection'
import * as S from './MatchingPage.styles'

export function MatchingPage() {
  return (
    <S.Page>
      <S.Sheet>
        <S.Section>
          <SectionHeader title="매칭 | 나와 음악 취향이 닮은 사람들" actionLabel="더보기" />
          <S.CardList>
            {MOCK_TASTE_MATCHES.map((match) => (
              <TasteMatchCard key={match.id} match={match} />
            ))}
          </S.CardList>
        </S.Section>

        <S.Divider />

        <LetterSection quota={MOCK_LETTER_QUOTA} />

        <S.Divider />

        <RoomSection rooms={MOCK_ROOMS} />
      </S.Sheet>
    </S.Page>
  )
}
