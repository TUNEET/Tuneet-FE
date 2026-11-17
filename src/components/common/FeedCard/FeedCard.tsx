import type { MouseEvent } from 'react'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { MusicCardTone } from '@/components/common/MusicCard/MusicCard.styles'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'
import * as S from './FeedCard.styles'

type FeedCardProps = {
  feed: Feed
  tone?: MusicCardTone
  expanded?: boolean
  liked?: boolean
  onClick?: (feed: Feed) => void
  onLikeToggle?: (feed: Feed) => void
}

export function FeedCard({
  feed,
  tone = 'blue',
  expanded = false,
  liked = false,
  onClick,
  onLikeToggle,
}: FeedCardProps) {
  const { nickname, song, content, createdAt } = feed

  const handleLikeClick = (event: MouseEvent) => {
    event.stopPropagation()
    onLikeToggle?.(feed)
  }

  const likeButton = onLikeToggle && (
    <S.HeartButton
      type="button"
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      aria-pressed={liked}
      onClick={handleLikeClick}
    >
      <HeartIcon filled={liked} size={14} />
    </S.HeartButton>
  )

  return (
    <MusicCard
      tone={tone}
      nickname={nickname}
      meta={formatTimeAgo(createdAt)}
      image={song.albumImageUrl}
      title={`${song.title} - ${song.artist}`}
      description={content}
      playable
      action={likeButton}
      actionAlign="start"
      expanded={expanded}
      onClick={onClick && (() => onClick(feed))}
    />
  )
}
