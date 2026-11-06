import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { MusicCardTone } from '@/components/common/MusicCard/MusicCard.styles'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'

type FeedCardProps = {
  feed: Feed
  tone?: MusicCardTone
  expanded?: boolean
  onClick?: (feed: Feed) => void
}

export function FeedCard({ feed, tone = 'blue', expanded = false, onClick }: FeedCardProps) {
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
      expanded={expanded}
      onClick={onClick && (() => onClick(feed))}
    />
  )
}
