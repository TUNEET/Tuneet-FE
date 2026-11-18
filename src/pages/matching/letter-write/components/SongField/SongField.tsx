import musicNoteRoseIcon from '@/assets/icons/music-note-rose.svg'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import type { Song } from '@/types/song'
import * as S from './SongField.styles'

type SongFieldProps = {
  id: string
  song: Song | null
  disabled?: boolean
  onOpenSearch: () => void
}

export function SongField({ id, song, disabled = false, onOpenSearch }: SongFieldProps) {
  return (
    <S.Wrapper>
      <S.SearchBox>
        <S.SearchInput
          id={id}
          type="search"
          readOnly
          disabled={disabled}
          placeholder="노래 검색하기"
          onClick={onOpenSearch}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onOpenSearch()
            }
          }}
        />
      </S.SearchBox>
      {song && (
        <S.SelectedSong>
          <S.SongInfo>
            <CoverImage src={song.albumImageUrl} />
            <span>
              {song.title} - {song.artist}
            </span>
          </S.SongInfo>
          <img src={musicNoteRoseIcon} alt="" width={8} height={10} />
        </S.SelectedSong>
      )}
    </S.Wrapper>
  )
}
