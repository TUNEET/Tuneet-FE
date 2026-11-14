import playIcon from '@/assets/icons/play-circle-gray.svg'
import characterLetter from '@/assets/images/character-letter-detail.png'
import type { LetterMusic } from '@/types/letter'
import * as S from './LetterCards.styles'

type LetterCardsProps = {
  content: string
  from: string
  music: LetterMusic
}

export function LetterCards({ content, from, music }: LetterCardsProps) {
  return (
    <S.Cards>
      <S.MessageCard>
        <S.Content>{content}</S.Content>
        <S.From>From. {from}</S.From>
      </S.MessageCard>
      <S.SongCard>
        <S.Character src={characterLetter} alt="" />
        <S.PlayIcon src={playIcon} alt="" />
        <S.Song>
          <img src={music.musicPicture ?? ''} alt="" />
          <span>
            {music.title} - {music.artist}
          </span>
        </S.Song>
      </S.SongCard>
    </S.Cards>
  )
}
