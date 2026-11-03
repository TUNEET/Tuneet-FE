import { MusicCard } from '@/components/common/MusicCard/MusicCard'

export type TasteMatchCardProps = {
  nickname: string
  similarity: number
  distance: string
  image: string
  title: string
  description: string
  isSong?: boolean
}

export function TasteMatchCard({
  nickname,
  similarity,
  distance,
  image,
  title,
  description,
  isSong = false,
}: TasteMatchCardProps) {
  return (
    <MusicCard
      tone="purple"
      nickname={nickname}
      meta={`${similarity}% / ${distance}`}
      image={image}
      title={title}
      description={description}
      playable={isSong}
    />
  )
}
