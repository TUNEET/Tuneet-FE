import { MusicCard } from '@/components/common/MusicCard/MusicCard'

export type FeedCardProps = {
  nickname: string
  timeAgo: string
  songTitle: string
  artist: string
  albumImage: string
  comment: string
}

export function FeedCard({
  nickname,
  timeAgo,
  songTitle,
  artist,
  albumImage,
  comment,
}: FeedCardProps) {
  return (
    <MusicCard
      tone="blue"
      nickname={nickname}
      meta={timeAgo}
      image={albumImage}
      title={`${songTitle} - ${artist}`}
      description={comment}
      playable
    />
  )
}
