import { useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import { getFeedComments, getReplyThread } from '@/apis/notification'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { FeedComment } from '@/types/notification'
import { formatTimeAgo } from '@/utils/format'
import { ReplyPreview } from '../ReplyPreview/ReplyPreview'
import * as S from './FeedCommentsCard.styles'

type FeedCommentsCardProps = {
  /** 피드의 코멘트 전체를 볼 때 */
  feedId?: number
  /** 받은 답장 알림에서, 그 답장이 이어진 코멘트 하나와 주고받은 답장만 볼 때 */
  replyId?: number
  onSelect?: (comment: FeedComment) => void
}

/**
 * 한 피드에 달린 코멘트 전부를 최신순으로 보여 주고, 각 코멘트에 주고받은 답장은
 * 그 코멘트 아래에 대댓글처럼 붙인다. 누가 보든 같은 내용이 보인다
 */
export function FeedCommentsCard({ feedId, replyId, onSelect }: FeedCommentsCardProps) {
  const showToast = useToast()
  const [comments, setComments] = useState<FeedComment[] | null>(null)

  useEffect(() => {
    let isStale = false

    const load =
      replyId !== undefined
        ? getReplyThread(replyId)
        : feedId !== undefined
          ? getFeedComments(feedId)
          : Promise.resolve([])

    load
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
  }, [feedId, replyId, showToast])

  const handleLikeToggle = useMusicLike((update) =>
    setComments((current) =>
      current
        ? update(current).map((comment) => ({
            ...comment,
            replies: comment.replies && update(comment.replies),
          }))
        : current,
    ),
  )

  return (
    <S.Card role="dialog" aria-labelledby="feed-comments-title">
      <S.Title id="feed-comments-title">
        {replyId !== undefined ? '주고받은 답장' : '이 글에서 나눈 코멘트'}
      </S.Title>
      {comments && comments.length === 0 && <S.Empty>아직 나눈 코멘트가 없어요</S.Empty>}
      {comments && comments.length > 0 && (
        <S.List>
          {comments.map((comment) => (
            <S.Item
              key={comment.key}
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
              {comment.replies?.map((reply) => (
                <ReplyPreview
                  key={reply.key}
                  reply={reply}
                  indent="2.8rem"
                  onSelect={onSelect && (() => onSelect(reply))}
                  onLikeToggle={() => handleLikeToggle(reply)}
                />
              ))}
            </S.Item>
          ))}
        </S.List>
      )}
    </S.Card>
  )
}
