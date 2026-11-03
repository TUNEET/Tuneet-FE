import { useNavigate } from 'react-router'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { MAX_RECOMMENDED_USERS } from '@/constants/matching'
import { getLetterWritePath, getUserProfilePath } from '@/constants/routes'
import { MOCK_RECOMMENDED_USERS } from '@/mocks/data'
import * as S from './RecommendedUsersPage.styles'

export function RecommendedUsersPage() {
  const navigate = useNavigate()
  const users = MOCK_RECOMMENDED_USERS.slice(0, MAX_RECOMMENDED_USERS)

  return (
    <SheetPage>
      <SectionHeader title="매칭 | 나와 음악 취향이 닮은 사람들" actionLabel="새로고침" />
      <S.CardList>
        {users.map((user) => (
          <TasteMatchCard
            key={user.id}
            match={user}
            onClick={() => navigate(getUserProfilePath(user.id))}
            onLetterClick={() => navigate(getLetterWritePath(user.id))}
          />
        ))}
      </S.CardList>
    </SheetPage>
  )
}
