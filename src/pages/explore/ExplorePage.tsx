import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { ROUTES } from '@/constants/routes'
import { MOCK_EXPLORE_FEEDS } from '@/mocks/data'
import type { Feed } from '@/types/feed'
import { FeedDetailModal } from './components/FeedDetailModal/FeedDetailModal'
import * as S from './ExplorePage.styles'

export function ExplorePage() {
  const navigate = useNavigate()
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)

  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="20.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="27.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="28.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.ExploreSheet>
        <S.Section>
          <SectionHeader
            title="피드"
            actionLabel="글쓰기"
            onActionClick={() => navigate(ROUTES.exploreWrite)}
          />
          <S.CardList>
            {MOCK_EXPLORE_FEEDS.map((feed) => (
              <FeedCard key={feed.id} feed={feed} onClick={setSelectedFeed} />
            ))}
          </S.CardList>
        </S.Section>
      </S.ExploreSheet>

      <S.BottomFade />

      {selectedFeed && (
        <FeedDetailModal feed={selectedFeed} onClose={() => setSelectedFeed(null)} />
      )}
    </S.Page>
  )
}
