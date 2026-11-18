import playIcon from '@/assets/icons/play-circle-gray.svg'
import characterLetter from '@/assets/images/character-letter-detail.png'
import { LikeButton } from '@/components/common/LikeButton/LikeButton'
import type { LetterMusic } from '@/types/letter'
import * as S from './LetterCards.styles'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'

type LetterCardsProps = {
  content: string
  from: string
  music: LetterMusic
  liked?: boolean
  onLikeToggle?: () => void
}

export function LetterCards({
  content,
  from,
  music,
  liked = false,
  onLikeToggle,
}: LetterCardsProps) {
  return (
    <S.Cards>
      {onLikeToggle && (
        <S.Like>
          <LikeButton liked={liked} tone="roseBadge" onToggle={onLikeToggle} />
        </S.Like>
      )}
      <S.MessageCard>
        <S.Content>{content}</S.Content>
        <S.From>From. {from}</S.From>
      </S.MessageCard>
      <S.SongCard>
        <S.Character src={characterLetter} alt="" />
        <S.PlayIcon src={playIcon} alt="" />
        <S.Song>
          <CoverImage src={music.musicPicture} />
          <span>
            {music.title} - {music.artist}
          </span>
        </S.Song>
      </S.SongCard>
    </S.Cards>
  )
}
