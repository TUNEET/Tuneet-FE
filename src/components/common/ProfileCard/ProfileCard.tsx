import artistPurpleIcon from '@/assets/icons/artist-purple.svg'
import artistIcon from '@/assets/icons/artist.svg'
import editIcon from '@/assets/icons/edit.svg'
import genrePurpleIcon from '@/assets/icons/genre-purple.svg'
import genreIcon from '@/assets/icons/genre.svg'
import musicNotePurpleIcon from '@/assets/icons/music-note-purple.svg'
import musicNoteIcon from '@/assets/icons/music-note.svg'
import { Chip } from '@/components/common/Chip/Chip'
import type { Profile } from '@/types/user'
import * as S from './ProfileCard.styles'
import type { ProfileCardTone } from './ProfileCard.styles'

const ICONS = {
  pink: { musicNote: musicNoteIcon, genre: genreIcon, artist: artistIcon },
  purple: { musicNote: musicNotePurpleIcon, genre: genrePurpleIcon, artist: artistPurpleIcon },
}

type ProfileCardProps = {
  profile: Profile
  tone?: ProfileCardTone
  meta?: string
  onEditClick?: () => void
}

export function ProfileCard({ profile, tone = 'pink', meta, onEditClick }: ProfileCardProps) {
  const { nickname, characterImageUrl, photoUrl, song, genres, artists } = profile
  const icons = ICONS[tone]

  return (
    <S.Card $tone={tone}>
      <S.Content>
        <S.Profile>
          <S.Avatar $tone={tone}>
            {photoUrl ? (
              <S.AvatarPhoto src={photoUrl} alt="" />
            ) : (
              <S.AvatarCharacter src={characterImageUrl} alt="" />
            )}
          </S.Avatar>
          <S.Info>
            <S.Nickname>{nickname}</S.Nickname>
            {song && (
              <S.Song>
                <img src={icons.musicNote} alt="" width={8} height={10} />
                {song.title} - {song.artist}
              </S.Song>
            )}
          </S.Info>
        </S.Profile>
        <S.Tags>
          <S.TagRow>
            <img src={icons.genre} alt="좋아하는 장르" width={18} height={18} />
            {genres.map((genre) => (
              <Chip key={genre} tone={tone}>
                {genre}
              </Chip>
            ))}
          </S.TagRow>
          <S.TagRow>
            <img src={icons.artist} alt="좋아하는 아티스트" width={18} height={18} />
            {artists.map((artist) => (
              <Chip key={artist} tone={tone} variant="soft">
                {artist}
              </Chip>
            ))}
          </S.TagRow>
        </S.Tags>
      </S.Content>
      {meta && <S.Meta>{meta}</S.Meta>}
      {onEditClick && (
        <S.EditButton type="button" aria-label="프로필 수정" onClick={onEditClick}>
          <img src={editIcon} alt="" width={20} height={20} />
        </S.EditButton>
      )}
    </S.Card>
  )
}
