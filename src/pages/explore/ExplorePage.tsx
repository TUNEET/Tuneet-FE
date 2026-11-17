import { useCallback, useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { deleteFeed, getFeed, getFeeds } from '@/apis/feed'
import { PAGE_DATA } from '@/apis/pageData'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { getExploreEditPath, getFeedPath, ROUTES } from '@/constants/routes'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { ExploreFeed } from '@/types/feed'
import { takePrefetched } from '@/utils/prefetch'
import { FeedDetailModal } from './components/FeedDetailModal/FeedDetailModal'
import * as S from './ExplorePage.styles'

const getFeedId = ({ id }: ExploreFeed) => id

type FeedLocationState = { fromList?: boolean }

// 첫 페이지는 탭에 들어올 때 미리 받아 둔 요청을 이어받는다
const fetchFeedPage = (cursor?: number) =>
  cursor === undefined ? takePrefetched(PAGE_DATA.exploreFeeds) : getFeeds(cursor)

export function ExplorePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { state } = useLocation() as { state: FeedLocationState | null }
  const feedMatch = useMatch(ROUTES.feed)
  const selectedFeedId = feedMatch ? Number(feedMatch.params.feedId) : null
  // 알림 등으로 바로 들어와 목록에 아직 없는 피드는 따로 받아 둔다
  const [fetchedFeed, setFetchedFeed] = useState<ExploreFeed | null>(null)
  // 삭제 후 화면을 닫는 사이에 목록에서 빠졌다고 다시 받아 오지 않게 한다
  const [deletedFeedId, setDeletedFeedId] = useState<number | null>(null)

  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const feeds = useCursorList(fetchFeedPage, getFeedId, handleLoadError)
  // 목록에서 꺼내 써야 상세에서 누른 좋아요가 카드에도 바로 반영된다
  const listedFeed = feeds.items.find((feed) => feed.id === selectedFeedId)
  const selectedFeed = listedFeed ?? (fetchedFeed?.id === selectedFeedId ? fetchedFeed : null)
  const needsFetch = selectedFeedId !== null && !listedFeed && selectedFeedId !== deletedFeedId
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    feeds.loadMore,
    feeds.hasNext && !feeds.isLoading,
  )

  const openFeed = (feedId: number) =>
    navigate(getFeedPath(feedId), { state: { fromList: true } satisfies FeedLocationState })

  // 목록에서 열었으면 뒤로 가서 닫고, 바로 들어왔으면 뒤로 갈 곳이 없으니 목록으로 바꾼다
  const closeFeed = useCallback(() => {
    if (state?.fromList) navigate(-1)
    else navigate(ROUTES.explore, { replace: true })
  }, [navigate, state?.fromList])

  useEffect(() => {
    if (!needsFetch) return
    let isStale = false

    if (!Number.isInteger(selectedFeedId) || selectedFeedId <= 0) {
      showToast('피드를 찾을 수 없어요')
      navigate(ROUTES.explore, { replace: true })
      return
    }

    getFeed(selectedFeedId)
      .then((feed) => {
        if (!isStale) setFetchedFeed(feed)
      })
      .catch((error) => {
        if (isStale) return
        showToast(getApiError(error).message)
        navigate(ROUTES.explore, { replace: true })
      })

    return () => {
      isStale = true
    }
  }, [needsFetch, selectedFeedId, navigate, showToast])

  const handleLikeToggle = useMusicLike((update) => {
    feeds.setItems(update)
    setFetchedFeed((prev) => (prev ? update([prev])[0] : prev))
  })

  const handleDelete = async (feedId: number) => {
    try {
      await deleteFeed(feedId)
      setDeletedFeedId(feedId)
      feeds.setItems((prev) => prev.filter((feed) => feed.id !== feedId))
      closeFeed()
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
                  onClick={() => openFeed(feed.id)}
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
          onClose={closeFeed}
        />
      )}
    </S.Page>
  )
}
