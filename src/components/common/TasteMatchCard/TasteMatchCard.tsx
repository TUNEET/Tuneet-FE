import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { TasteMatch, TasteMatchType } from '@/types/match'
import { formatDistance } from '@/utils/format'
import { getObjectParticle } from '@/utils/josa'

const DESCRIPTIONS: Record<TasteMatchType, string> = {
  artist: '나와 같은 아티스트 취향',
  song: '나와 같은 노래 취향',
}

type TasteMatchCardProps = {
  match: TasteMatch
}

export function TasteMatchCard({ match }: TasteMatchCardProps) {
  const { nickname, similarity, distanceKm, matchType, name, imageUrl } = match

  return (
    <MusicCard
      tone="purple"
      nickname={nickname}
      meta={`${similarity}% / ${formatDistance(distanceKm)}`}
      image={imageUrl}
      title={`[${name}]${getObjectParticle(name)} 좋아해요`}
      description={DESCRIPTIONS[matchType]}
      playable={matchType === 'song'}
    />
  )
}
