import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { PAGE_DATA } from '@/apis/pageData'
import { getMyProfile } from '@/apis/user'
import characterSleeping from '@/assets/images/character-sleeping.png'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { ProfileCard } from '@/components/common/ProfileCard/ProfileCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { RecommendationList } from '@/components/common/RecommendationList/RecommendationList'
import { getUserProfilePath, ROUTES } from '@/constants/routes'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useToast } from '@/hooks/useToast'
import type { ExploreFeed } from '@/types/feed'
import type { Profile } from '@/types/user'
import { toProfileCard } from '@/utils/profile'
import * as S from './HomePage.styles'
import { takePrefetched } from '@/utils/prefetch'

const HOME_RECOMMENDATION_COUNT = 2

type FeedState =
  { status: 'loading' } | { status: 'error' } | { status: 'done'; items: ExploreFeed[] }

export function HomePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [feeds, setFeeds] = useState<FeedState>({ status: 'loading' })
  const { state: recommendations } = useRecommendations()

  useEffect(() => {
    let isStale = false

    getMyProfile()
      .then((data) => {
        if (!isStale) setProfile(toProfileCard(data))
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  useEffect(() => {
    let isStale = false

    takePrefetched(PAGE_DATA.homeFeeds)
      .then(({ items }) => {
        if (!isStale) setFeeds({ status: 'done', items })
      })
      .catch(() => {
        if (!isStale) setFeeds({ status: 'error' })
      })

    return () => {
      isStale = true
    }
  }, [])

  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="14.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="21.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="22.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.Greeting>오늘도 새로운 음악을 만나보세요!</S.Greeting>

      {profile && (
        <S.ProfileArea>
          <ProfileCard profile={profile} onEditClick={() => navigate(ROUTES.my)} />
          <S.SleepingCharacter src={characterSleeping} alt="" />
        </S.ProfileArea>
      )}

      <S.Sheet>
        <S.Section>
          <SectionHeader
            title="탐색 피드 최근 게시글"
            actionLabel="더보기"
            onActionClick={() => navigate(ROUTES.explore)}
          />
          {feeds.status === 'done' && feeds.items.length > 0 && (
            <S.CardList>
              {feeds.items.map((feed) => (
                <FeedCard key={feed.id} feed={feed} onClick={() => navigate(ROUTES.explore)} />
              ))}
            </S.CardList>
          )}
          {feeds.status === 'done' && feeds.items.length === 0 && (
            <S.Empty>아직 올라온 피드가 없어요</S.Empty>
          )}
          {feeds.status === 'error' && <S.Empty>피드를 불러오지 못했어요</S.Empty>}
        </S.Section>

        <S.Section>
          <SectionHeader
            title="나와 음악 취향이 닮은 사람들"
            actionLabel="더보기"
            onActionClick={() => navigate(ROUTES.matching)}
          />
          <RecommendationList
            state={recommendations}
            limit={HOME_RECOMMENDATION_COUNT}
            onUserClick={(match) => navigate(getUserProfilePath(match.id))}
          />
        </S.Section>
      </S.Sheet>

      <S.BottomFade />
    </S.Page>
  )
}
