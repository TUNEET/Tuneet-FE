import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import musicNoteRoseIcon from '@/assets/icons/music-note-rose.svg'
import type { Song } from '@/types/song'
import * as S from './SongField.styles'

type SongFieldProps = {
  id: string
  song: Song | null
  onSearch: (query: string) => void
}

export function SongField({ id, song, onSearch }: SongFieldProps) {
  const [query, setQuery] = useState('')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return
    event.preventDefault()
    if (!query.trim()) return
    onSearch(query)
    setQuery('')
  }

  return (
    <S.Wrapper>
      <S.SearchBox>
        <S.SearchInput
          id={id}
          type="search"
          enterKeyHint="search"
          value={query}
          placeholder="노래 검색하기"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </S.SearchBox>
      {song && (
        <S.SelectedSong>
          <S.SongInfo>
            <img src={song.albumImageUrl} alt="" />
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
