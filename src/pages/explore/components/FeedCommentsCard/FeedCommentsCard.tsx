import { useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import { getFeedComments } from '@/apis/notification'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { FeedComment } from '@/types/notification'
import { formatTimeAgo } from '@/utils/format'
import * as S from './FeedCommentsCard.styles'

type FeedCommentsCardProps = {
  feedId: number
  onSelect?: (comment: FeedComment) => void
}

export function FeedCommentsCard({ feedId, onSelect }: FeedCommentsCardProps) {
  const showToast = useToast()
  const [comments, setComments] = useState<FeedComment[] | null>(null)

  useEffect(() => {
    let isStale = false

    getFeedComments(feedId)
      .then((found) => {
        if (!isStale) setComments(found)
      })
      .catch((error) => {
        if (isStale) return
        setComments([])
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [feedId, showToast])

  const handleLikeToggle = useMusicLike((update) =>
    setComments((current) => (current ? update(current) : current)),
  )

  return (
    <S.Card role="dialog" aria-labelledby="feed-comments-title">
      <S.Title id="feed-comments-title">이 글에서 나눈 코멘트</S.Title>
      {comments && comments.length === 0 && <S.Empty>아직 나눈 코멘트가 없어요</S.Empty>}
      {comments && comments.length > 0 && (
        <S.List>
          {comments.map((comment) => (
            <S.Item
              key={`${comment.nickname}-${comment.createdAt}`}
              $clickable={!!onSelect}
              role={onSelect ? 'button' : undefined}
              tabIndex={onSelect ? 0 : undefined}
              onClick={() => onSelect?.(comment)}
              onKeyDown={(event) => {
                if (!onSelect || (event.key !== 'Enter' && event.key !== ' ')) return
                event.preventDefault()
                onSelect(comment)
              }}
            >
              <S.ItemTop>
                <span>{comment.nickname}</span>
                <span>{formatTimeAgo(comment.createdAt)}</span>
              </S.ItemTop>
              <S.ItemBody>
                <S.ItemMain>
                  <S.Thumbnail>
                    <CoverImage src={comment.song.albumImageUrl} />
                  </S.Thumbnail>
                  <S.Texts>
                    <S.Song>
                      {comment.song.title} - {comment.song.artist}
                    </S.Song>
                    <S.Message>{comment.message}</S.Message>
                  </S.Texts>
                </S.ItemMain>
                <S.Like
                  type="button"
                  aria-label={comment.liked ? '좋아요 취소' : '좋아요'}
                  aria-pressed={comment.liked}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleLikeToggle(comment)
                  }}
                >
                  <HeartIcon filled={comment.liked} size={9} />
                </S.Like>
              </S.ItemBody>
            </S.Item>
          ))}
        </S.List>
      )}
    </S.Card>
  )
}
