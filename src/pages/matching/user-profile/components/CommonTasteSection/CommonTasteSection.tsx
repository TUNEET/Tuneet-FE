import musicNoteIcon from '@/assets/icons/music-note.svg'
import type { CommonTaste } from '@/types/user'
import * as S from './CommonTasteSection.styles'

type CommonTasteSectionProps = {
  nickname: string
  commonTaste: CommonTaste
}

export function CommonTasteSection({ nickname, commonTaste }: CommonTasteSectionProps) {
  const { artists, songs, genres } = commonTaste

  return (
    <S.Wrapper>
      <S.Title>
        나와 <strong>{nickname}</strong>님이 함께 좋아해요
      </S.Title>
      <S.Groups>
        {artists.length > 0 && (
          <S.Row>
            {artists.map(({ name, imageUrl }) => (
              <S.ImageChip key={name}>
                <img src={imageUrl} alt="" />
                {name}
              </S.ImageChip>
            ))}
          </S.Row>
        )}
        {songs.length > 0 && (
          <S.Row>
            {songs.map(({ title, artist, albumImageUrl }) => (
              <S.ImageChip key={`${title}-${artist}`}>
                <img src={albumImageUrl} alt="" />
                {title} - {artist}
              </S.ImageChip>
            ))}
          </S.Row>
        )}
        {genres.length > 0 && (
          <S.Row>
            {genres.map((genre) => (
              <S.GenreChip key={genre}>
                <img src={musicNoteIcon} alt="" width={8} height={10} />
                {genre}
              </S.GenreChip>
            ))}
          </S.Row>
        )}
      </S.Groups>
    </S.Wrapper>
  )
}
