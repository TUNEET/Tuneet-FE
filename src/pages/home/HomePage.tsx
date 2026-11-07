import { useNavigate } from 'react-router'
import characterSleeping from '@/assets/images/character-sleeping.png'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { ProfileCard } from '@/components/common/ProfileCard/ProfileCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { getUserProfilePath, ROUTES } from '@/constants/routes'
import { MOCK_FEEDS, MOCK_PROFILE, MOCK_TASTE_MATCHES } from '@/mocks/data'

import * as S from './HomePage.styles'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="14.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="21.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="22.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.Greeting>오늘도 새로운 음악을 만나보세요!</S.Greeting>

      <S.ProfileArea>
        <ProfileCard profile={MOCK_PROFILE} onEditClick={() => {}} />
        <S.SleepingCharacter src={characterSleeping} alt="" />
      </S.ProfileArea>

      <S.Sheet>
        <S.Section>
          <SectionHeader
            title="탐색 피드 최근 게시글"
            actionLabel="더보기"
            onActionClick={() => navigate(ROUTES.explore)}
          />
          <S.CardList>
            {MOCK_FEEDS.map((feed) => (
              <FeedCard key={feed.id} feed={feed} />
            ))}
          </S.CardList>
        </S.Section>

        <S.Section>
          <SectionHeader
            title="나와 음악 취향이 닮은 사람들"
            actionLabel="더보기"
            onActionClick={() => navigate(ROUTES.matching)}
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
      </S.Sheet>

      <S.BottomFade />
    </S.Page>
  )
}
