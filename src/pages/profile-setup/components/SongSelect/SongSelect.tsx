import type { FormEvent } from 'react'
import heartFilledIcon from '@/assets/icons/heart-filled.svg'
import heartOutlineIcon from '@/assets/icons/heart-outline.svg'
import musicNoteIcon from '@/assets/icons/music-note.svg'
import { Panel, PanelHeader, PanelIcon, PanelLabel } from '../TasteSelect/TasteSelect.styles'
import * as S from './SongSelect.styles'

type Song = { title: string; artist: string; albumImage: string }

type SongSelectProps = {
  songs: Song[]
  onSearchSubmit: () => void
}

export function SongSelect({ songs, onSearchSubmit }: SongSelectProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearchSubmit()
  }

  return (
    <S.Panels>
      <Panel $openHeight={`${9.7 + songs.length * 4}rem`} $isOpen>
        <PanelHeader as="div">
          <PanelIcon $isOpen={false}>
            <img
              src={songs.length > 0 ? heartFilledIcon : heartOutlineIcon}
              alt=""
              width={12}
              height={11}
            />
          </PanelIcon>
          <PanelLabel>좋아하는 노래</PanelLabel>
        </PanelHeader>
        <form onSubmit={handleSubmit}>
          <S.SongSearch type="search" placeholder="노래 검색하기" aria-label="노래 검색" />
        </form>
        {songs.length > 0 && (
          <S.Songs>
            {songs.map(({ title, artist, albumImage }) => (
              <S.Song key={`${title}-${artist}`}>
                <img src={albumImage} alt="" width={12} height={12} />
                <span>
                  {title} - {artist}
                </span>
                <S.SongNote src={musicNoteIcon} alt="" />
              </S.Song>
            ))}
          </S.Songs>
        )}
      </Panel>
    </S.Panels>
  )
}
