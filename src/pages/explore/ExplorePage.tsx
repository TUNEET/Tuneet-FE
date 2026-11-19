import { useCallback, useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { deleteFeed, getFeed, getFeeds } from '@/apis/feed'
import { PAGE_DATA } from '@/apis/pageData'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { NoticeModal } from '@/components/common/NoticeModal/NoticeModal'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { getAuthorPath, getExploreEditPath, getFeedPath, ROUTES } from '@/constants/routes'
import { useCursorList } from '@/hooks/useCursorList'
import { useHasScrolled } from '@/hooks/useHasScrolled'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { ExploreFeed } from '@/types/feed'
import { takePrefetched } from '@/utils/prefetch'
import { FeedDetailModal } from './components/FeedDetailModal/FeedDetailModal'
import * as S from './ExplorePage.styles'

const getFeedId = ({ id }: ExploreFeed) => id

const FEED_NOT_FOUND_CODE = 'F4001'

type FeedLocationState = { fromList?: boolean }

const fetchFeedPage = (cursor?: number) =>
  cursor === undefined ? takePrefetched(PAGE_DATA.exploreFeeds) : getFeeds(cursor)

export function ExplorePage() {
  const navigate = useNavigate()
  // 목록을 내리기 시작하면 하단 블러가 글자를 가리지 않게 숨긴다
  const hasScrolled = useHasScrolled()
  const showToast = useToast()
  const { state } = useLocation() as { state: FeedLocationState | null }
  const feedMatch = useMatch(ROUTES.feed)
  const selectedFeedId = feedMatch ? Number(feedMatch.params.feedId) : null
  const [fetchedFeed, setFetchedFeed] = useState<ExploreFeed | null>(null)
  const [deletedFeedId, setDeletedFeedId] = useState<number | null>(null)
  const [missingFeedId, setMissingFeedId] = useState<number | null>(null)

  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const feeds = useCursorList(fetchFeedPage, getFeedId, handleLoadError)
  const listedFeed = feeds.items.find((feed) => feed.id === selectedFeedId)
  const selectedFeed = listedFeed ?? (fetchedFeed?.id === selectedFeedId ? fetchedFeed : null)
  const isInvalidFeedId =
    selectedFeedId !== null && (!Number.isInteger(selectedFeedId) || selectedFeedId <= 0)
  const needsFetch =
    selectedFeedId !== null &&
    !isInvalidFeedId &&
    !listedFeed &&
    selectedFeedId !== deletedFeedId &&
    selectedFeedId !== missingFeedId
  const isFeedMissing =
    isInvalidFeedId || (selectedFeedId !== null && selectedFeedId === missingFeedId)
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    feeds.loadMore,
    feeds.hasNext && !feeds.isLoading,
  )

  const openFeed = (feedId: number) =>
    navigate(getFeedPath(feedId), { state: { fromList: true } satisfies FeedLocationState })

  const closeFeed = useCallback(() => {
    if (state?.fromList) navigate(-1)
    else navigate(ROUTES.explore, { replace: true })
  }, [navigate, state?.fromList])

  useEffect(() => {
    if (!needsFetch) return
    let isStale = false

    getFeed(selectedFeedId)
      .then((feed) => {
        if (!isStale) setFetchedFeed(feed)
      })
      .catch((error) => {
        if (isStale) return
        const { code, message } = getApiError(error)
        if (code === FEED_NOT_FOUND_CODE) {
          setMissingFeedId(selectedFeedId)
          return
        }
        showToast(message)
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

  const getAuthorClick = (feed: ExploreFeed) => {
    const path = getAuthorPath(feed)
    return path ? () => navigate(path) : undefined
  }

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
                  onAuthorClick={getAuthorClick(feed)}
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

      <S.BottomFade $isHidden={hasScrolled} />

      {isFeedMissing && (
        <NoticeModal
          title="삭제된 피드입니다."
          description="해당 게시글을 열 수 없습니다."
          secondaryAction={{ label: '홈으로', onClick: () => navigate(ROUTES.home) }}
          primaryAction={{ label: '이전 화면으로', onClick: closeFeed }}
          onClose={closeFeed}
        />
      )}

      {selectedFeed && (
        <FeedDetailModal
          feed={selectedFeed}
          isMine={selectedFeed.isMine}
          liked={selectedFeed.liked}
          onLikeToggle={() => handleLikeToggle(selectedFeed)}
          onEdit={() => navigate(getExploreEditPath(selectedFeed.id))}
          onDelete={() => handleDelete(selectedFeed.id)}
          onAuthorClick={getAuthorClick(selectedFeed)}
          commentsFeedId={selectedFeed.isMine ? selectedFeed.id : undefined}
          onClose={closeFeed}
        />
      )}
    </S.Page>
  )
}
