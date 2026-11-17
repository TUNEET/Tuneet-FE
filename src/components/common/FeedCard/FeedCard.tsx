import { LikeButton } from '@/components/common/LikeButton/LikeButton'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { MusicCardTone } from '@/components/common/MusicCard/MusicCard.styles'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'

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

  return (
    <MusicCard
      tone={tone}
      nickname={nickname}
      meta={formatTimeAgo(createdAt)}
      image={song.albumImageUrl}
      title={`${song.title} - ${song.artist}`}
      description={content}
      playable
      action={onLikeToggle && <LikeButton liked={liked} onToggle={() => onLikeToggle(feed)} />}
      actionAlign="start"
      expanded={expanded}
      onClick={onClick && (() => onClick(feed))}
    />
  )
}
