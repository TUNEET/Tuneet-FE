import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { getRoomPosts } from '@/apis/room'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath, ROUTES } from '@/constants/routes'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useToast } from '@/hooks/useToast'
import type { Feed } from '@/types/feed'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { useRoomHome } from '../hooks/useRoomHome'
import * as S from './RoomFeedsPage.styles'

const getFeedId = ({ id }: Feed) => id

export function RoomFeedsPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { roomId, room, isLoading } = useRoomHome()

  const fetchPosts = useCallback(
    (cursor?: number) =>
      // 주소가 잘못됐으면 요청하지 않는다
      roomId > 0 ? getRoomPosts(roomId, cursor) : Promise.resolve({ items: [], hasNext: false }),
    [roomId],
  )
  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const posts = useCursorList(fetchPosts, getFeedId, handleLoadError)
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    posts.loadMore,
    posts.hasNext && !posts.isLoading,
  )

  if (isLoading) return <SheetPage>{null}</SheetPage>

  if (!room) {
    return (
      <SheetPage>
        <SectionHeader
          title="피드"
          actionLabel="나가기"
          onActionClick={() => navigate(ROUTES.matching)}
        />
        <S.Empty>방을 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  return (
    <SheetPage>
      <RoomHeader
        name={room.name}
        description={room.description}
        onBackClick={() => navigate(getRoomPath(room.id))}
      />
      <SectionHeader title="피드" />
      {posts.items.length > 0 ? (
        <S.CardList>
          {posts.items.map((feed) => (
            <FeedCard key={feed.id} feed={feed} tone="purple" expanded />
          ))}
        </S.CardList>
      ) : (
        !posts.isLoading && <S.Empty>아직 올라온 피드가 없어요</S.Empty>
      )}
      <div ref={sentinelRef} aria-hidden />
    </SheetPage>
  )
}
