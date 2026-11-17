import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { deleteRoomPost, getRoomPosts } from '@/apis/room'
import { FeedCard } from '@/components/common/FeedCard/FeedCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomFeedWritePath, getRoomPath, ROUTES } from '@/constants/routes'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useToast } from '@/hooks/useToast'
import { FeedDetailModal } from '@/pages/explore/components/FeedDetailModal/FeedDetailModal'
import type { RoomPost } from '@/types/room'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { useRoomHome } from '../hooks/useRoomHome'
import * as S from './RoomFeedsPage.styles'

const getPostId = ({ id }: RoomPost) => id

export function RoomFeedsPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { roomId, room, isLoading } = useRoomHome()
  const [selectedPost, setSelectedPost] = useState<RoomPost | null>(null)

  const fetchPosts = useCallback(
    (cursor?: number) =>
      roomId > 0 ? getRoomPosts(roomId, cursor) : Promise.resolve({ items: [], hasNext: false }),
    [roomId],
  )
  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const posts = useCursorList(fetchPosts, getPostId, handleLoadError)
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    posts.loadMore,
    posts.hasNext && !posts.isLoading,
  )

  const handleDelete = async (postId: number) => {
    try {
      await deleteRoomPost(roomId, postId)
      posts.setItems((prev) => prev.filter(({ id }) => id !== postId))
      setSelectedPost(null)
      showToast('게시물을 삭제했어요')
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

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
      <SectionHeader
        title="피드"
        actionLabel="글쓰기"
        onActionClick={() => navigate(getRoomFeedWritePath(room.id))}
      />
      {posts.items.length > 0 ? (
        <S.CardList>
          {posts.items.map((feed) => (
            <FeedCard
              key={feed.id}
              feed={feed}
              tone="purple"
              expanded
              onClick={() => setSelectedPost(feed)}
            />
          ))}
        </S.CardList>
      ) : (
        !posts.isLoading && <S.Empty>아직 올라온 피드가 없어요</S.Empty>
      )}
      <div ref={sentinelRef} aria-hidden />

      {selectedPost && (
        <FeedDetailModal
          feed={selectedPost}
          isMine={selectedPost.isMine}
          commentable={false}
          onDelete={() => handleDelete(selectedPost.id)}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </SheetPage>
  )
}
