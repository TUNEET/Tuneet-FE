import { useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import {
  getFeedComments,
  getReceivedReplies,
  getRecentSentComments,
  toFeedComment,
} from '@/apis/notification'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { FeedComment } from '@/types/notification'
import { formatTimeAgo } from '@/utils/format'
import { ReplyPreview } from '../ReplyPreview/ReplyPreview'
import * as S from './FeedCommentsCard.styles'

const SAME_TIME_MS = 1000

const isSameTime = (a: string, b: string) =>
  Math.abs(new Date(a).getTime() - new Date(b).getTime()) < SAME_TIME_MS

type FeedCommentsCardProps = {
  feedId: number
  onSelect?: (comment: FeedComment) => void
}

/**
 * 한 피드에 달린 코멘트 전부(내가 단 것 포함)를 최신순으로 보여 주고,
 * 내 코멘트에 받은 답장은 그 코멘트 아래에 대댓글처럼 붙인다
 */
export function FeedCommentsCard({ feedId, onSelect }: FeedCommentsCardProps) {
  const showToast = useToast()
  const [comments, setComments] = useState<FeedComment[] | null>(null)

  useEffect(() => {
    let isStale = false

    Promise.all([getFeedComments(feedId), getReceivedReplies(), getRecentSentComments()])
      .then(([feedComments, replies, sentComments]) => {
        if (isStale) return
        const mySent = sentComments.filter((sent) => sent.feedId === feedId)
        const feedReplies = replies.filter((reply) => reply.feedId === feedId)

        // 코멘트 목록에는 번호가 없어서, 내용·시간이 같은 내 보낸 코멘트로 번호를 찾아 답장을 붙인다
        const withReplies = feedComments.map((comment) => {
          const mine = mySent.find(
            (sent) =>
              sent.message === comment.message && isSameTime(sent.createdAt, comment.createdAt),
          )
          const attached = mine
            ? feedReplies.filter((reply) => reply.feedMessageId === mine.id)
            : []
          return { ...comment, replies: attached.map(toFeedComment) }
        })
        setComments(withReplies)
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
      <S.Title id="feed-comments-title">이 글에서 나눈 코멘트</S.Title>
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
