import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'

type FeedCardProps = {
  feed: Feed
}

export function FeedCard({ feed }: FeedCardProps) {
  const { nickname, song, content, createdAt } = feed

  return (
    <MusicCard
      tone="blue"
      nickname={nickname}
      meta={formatTimeAgo(createdAt)}
      image={song.albumImageUrl}
      title={`${song.title} - ${song.artist}`}
      description={content}
      playable
    />
  )
}
