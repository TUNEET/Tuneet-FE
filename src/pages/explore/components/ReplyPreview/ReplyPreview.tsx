import type { KeyboardEvent, MouseEvent } from 'react'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import type { FeedComment } from '@/types/notification'
import { formatTimeAgo } from '@/utils/format'
import * as S from './ReplyPreview.styles'

type ReplyPreviewProps = {
  reply: FeedComment
  /** 코멘트 카드 안에서 들여쓰는 정도 */
  indent: string
  /** 누르면 답장 상세를 연다 */
  onSelect?: () => void
  onLikeToggle?: () => void
}

/** 코멘트 카드 안, 코멘트 아래에 대댓글처럼 붙는 받은 답장 */
export function ReplyPreview({ reply, indent, onSelect, onLikeToggle }: ReplyPreviewProps) {
  // 답장은 코멘트 카드 안에 있어서, 누를 때 카드(코멘트) 상세가 열리지 않게 막는다
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    onSelect?.()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!onSelect || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    event.stopPropagation()
    onSelect()
  }

  return (
    <S.Reply
      $indent={indent}
      $clickable={!!onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <S.Top>
        <span>
          <S.Arrow aria-hidden>↳</S.Arrow>
          {reply.nickname}의 답장
        </span>
        <span>{formatTimeAgo(reply.createdAt)}</span>
      </S.Top>
      <S.Body>
        <S.Texts>
          <S.Song>
            {reply.song.title} - {reply.song.artist}
          </S.Song>
          <S.Message>{reply.message}</S.Message>
        </S.Texts>
        {onLikeToggle && (
          <S.Like
            type="button"
            aria-label={reply.liked ? '좋아요 취소' : '좋아요'}
            aria-pressed={reply.liked}
            onClick={(event) => {
              event.stopPropagation()
              onLikeToggle()
            }}
          >
            <HeartIcon filled={reply.liked} size={9} />
          </S.Like>
        )}
      </S.Body>
    </S.Reply>
  )
}
