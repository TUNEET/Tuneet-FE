import messageIcon from '@/assets/icons/message.svg'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { TasteMatch, TasteMatchType } from '@/types/match'
import { formatDistance } from '@/utils/format'
import { getObjectParticle } from '@/utils/josa'
import * as S from './TasteMatchCard.styles'

const DESCRIPTIONS: Record<TasteMatchType, string> = {
  artist: '나와 같은 아티스트 취향',
  song: '나와 같은 노래 취향',
}

type TasteMatchCardProps = {
  match: TasteMatch
  onClick?: (match: TasteMatch) => void
  onLetterClick?: (match: TasteMatch) => void
}

export function TasteMatchCard({ match, onClick, onLetterClick }: TasteMatchCardProps) {
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
      onClick={onClick && (() => onClick(match))}
      action={
        onLetterClick && (
          <S.LetterButton
            type="button"
            aria-label={`${nickname}에게 편지 보내기`}
            onClick={(event) => {
              event.stopPropagation()
              onLetterClick(match)
            }}
          >
            <img src={messageIcon} alt="" width={28} height={30} />
          </S.LetterButton>
        )
      }
    />
  )
}
