import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import type { RecommendationState } from '@/hooks/useRecommendations'
import type { TasteMatch } from '@/types/match'
import * as S from './RecommendationList.styles'

type RecommendationListProps = {
  state: RecommendationState
  limit?: number
  onUserClick: (match: TasteMatch) => void
  onLetterClick?: (match: TasteMatch) => void
}

export function RecommendationList({
  state,
  limit,
  onUserClick,
  onLetterClick,
}: RecommendationListProps) {
  if (state.status === 'loading') return null
  if (state.status === 'error') return <S.Message>추천 사용자를 불러오지 못했어요</S.Message>
  if (state.status === 'locationRequired') {
    return <S.Message>위치 서비스를 켜면{'\n'}취향이 닮은 사람을 추천받을 수 있어요</S.Message>
  }
  if (state.users.length === 0) return <S.Message>지금은 근처에 추천할 사용자가 없어요</S.Message>

  return (
    <S.CardList>
      {state.users.slice(0, limit).map((match) => (
        <TasteMatchCard
          key={match.id}
          match={match}
          onClick={onUserClick}
          onLetterClick={onLetterClick}
        />
      ))}
    </S.CardList>
  )
}
