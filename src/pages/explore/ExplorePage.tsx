import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { deleteFeed, getFeeds } from '@/apis/feed'
import { PAGE_DATA } from '@/apis/pageData'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { getExploreEditPath, ROUTES } from '@/constants/routes'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { ExploreFeed } from '@/types/feed'
import { takePrefetched } from '@/utils/prefetch'
import { FeedDetailModal } from './components/FeedDetailModal/FeedDetailModal'
import * as S from './ExplorePage.styles'

const getFeedId = ({ id }: ExploreFeed) => id

// 첫 페이지는 탭에 들어올 때 미리 받아 둔 요청을 이어받는다
const fetchFeedPage = (cursor?: number) =>
  cursor === undefined ? takePrefetched(PAGE_DATA.exploreFeeds) : getFeeds(cursor)

export function ExplorePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null)

  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const feeds = useCursorList(getFeeds, getFeedId, handleLoadError)
  // 목록에서 꺼내 써야 상세에서 누른 좋아요가 카드에도 바로 반영된다
  const selectedFeed = feeds.items.find((feed) => feed.id === selectedFeedId) ?? null
  const feeds = useCursorList(fetchFeedPage, getFeedId, handleLoadError)
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    feeds.loadMore,
    feeds.hasNext && !feeds.isLoading,
  )

  const handleLikeToggle = useMusicLike((update) => feeds.setItems(update))

  const handleDelete = async (feedId: number) => {
    try {
      await deleteFeed(feedId)
      feeds.setItems((prev) => prev.filter((feed) => feed.id !== feedId))
      setSelectedFeedId(null)
      showToast('게시물을 삭제했어요')
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

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
          {feeds.items.length > 0 ? (
            <S.CardList>
              {feeds.items.map((feed) => (
                <FeedCard
                  key={feed.id}
                  feed={feed}
                  liked={feed.liked}
                  onClick={() => setSelectedFeedId(feed.id)}
                  onLikeToggle={() => handleLikeToggle(feed)}
                />
              ))}
            </S.CardList>
          ) : (
            !feeds.isLoading && <S.Empty>아직 올라온 피드가 없어요</S.Empty>
          )}
          <div ref={sentinelRef} aria-hidden />
        </S.Section>
      </S.ExploreSheet>

      <S.BottomFade />

      {selectedFeed && (
        <FeedDetailModal
          feed={selectedFeed}
          isMine={selectedFeed.isMine}
          liked={selectedFeed.liked}
          onLikeToggle={() => handleLikeToggle(selectedFeed)}
          onEdit={() => navigate(getExploreEditPath(selectedFeed.id))}
          onDelete={() => handleDelete(selectedFeed.id)}
          onClose={() => setSelectedFeedId(null)}
        />
      )}
    </S.Page>
  )
}
