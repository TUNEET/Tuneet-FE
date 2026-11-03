import artistIcon from '@/assets/icons/artist.svg'
import editIcon from '@/assets/icons/edit.svg'
import genreIcon from '@/assets/icons/genre.svg'
import musicNoteIcon from '@/assets/icons/music-note.svg'
import { Chip } from '@/components/common/Chip/Chip'
import type { Profile } from '@/types/user'
import * as S from './ProfileCard.styles'

type ProfileCardProps = {
  profile: Profile
  onEditClick?: () => void
}

export function ProfileCard({ profile, onEditClick }: ProfileCardProps) {
  const { nickname, characterImageUrl, song, genres, artists } = profile

  return (
    <S.Card>
      <S.Content>
        <S.Profile>
          <S.Avatar>
            <img src={characterImageUrl} alt="" />
          </S.Avatar>
          <S.Info>
            <S.Nickname>{nickname}</S.Nickname>
            <S.Song>
              <img src={musicNoteIcon} alt="" width={8} height={10} />
              {song.title} - {song.artist}
            </S.Song>
          </S.Info>
        </S.Profile>
        <S.Tags>
          <S.TagRow>
            <img src={genreIcon} alt="좋아하는 장르" width={18} height={18} />
            {genres.map((genre) => (
              <Chip key={genre}>{genre}</Chip>
            ))}
          </S.TagRow>
          <S.TagRow>
            <img src={artistIcon} alt="좋아하는 아티스트" width={18} height={18} />
            {artists.map((artist) => (
              <Chip key={artist} variant="soft">
                {artist}
              </Chip>
            ))}
          </S.TagRow>
        </S.Tags>
      </S.Content>
      <S.EditButton type="button" aria-label="프로필 수정" onClick={onEditClick}>
        <img src={editIcon} alt="" width={20} height={20} />
      </S.EditButton>
    </S.Card>
  )
}
