import messageIcon from '@/assets/icons/message.svg'
import { CharacterAvatar } from '@/components/common/CharacterAvatar/CharacterAvatar'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import type { TasteMatch, TasteReasonType } from '@/types/match'
import { formatDistanceRange } from '@/utils/format'
import { getObjectParticle } from '@/utils/josa'
import * as S from './TasteMatchCard.styles'

const DESCRIPTIONS: Record<TasteReasonType, string> = {
  MUSIC: '나와 같은 노래 취향',
  ARTIST: '나와 같은 아티스트 취향',
  GENRE: '나와 같은 장르 취향',
}

type TasteMatchCardProps = {
  match: TasteMatch
  onClick?: (match: TasteMatch) => void
  onLetterClick?: (match: TasteMatch) => void
}

export function TasteMatchCard({ match, onClick, onLetterClick }: TasteMatchCardProps) {
  const {
    nickname,
    profilePicture,
    characterColorId,
    similarity,
    distanceRange,
    reason,
    letterReceivable,
  } = match
  const meta = [
    similarity !== null && `${similarity}%`,
    distanceRange && formatDistanceRange(distanceRange),
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <MusicCard
      tone="purple"
      nickname={nickname}
      meta={meta}
      image={reason?.imageUrl}
      thumbnail={
        reason?.imageUrl ? undefined : (
          <CharacterAvatar colorId={characterColorId} imageUrl={profilePicture} />
        )
      }
      title={
        reason
          ? `[${reason.name}]${getObjectParticle(reason.name)} 좋아해요`
          : '새로운 취향을 만나보세요'
      }
      description={reason ? DESCRIPTIONS[reason.type] : '아직 겹치는 취향이 없어요'}
      playable={reason?.type === 'MUSIC'}
      onClick={onClick && (() => onClick(match))}
      action={
        onLetterClick &&
        letterReceivable && (
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
