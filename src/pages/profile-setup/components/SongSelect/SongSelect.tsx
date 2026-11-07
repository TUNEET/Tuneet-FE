import { useState } from 'react'
import heartFilledIcon from '@/assets/icons/heart-filled.svg'
import heartOutlineIcon from '@/assets/icons/heart-outline.svg'
import musicNoteIcon from '@/assets/icons/music-note.svg'
import { SongSearchSheet } from '@/pages/matching/room/playlist/components/SongSearchSheet/SongSearchSheet'
import { Panel, PanelHeader, PanelIcon, PanelLabel } from '../TasteSelect/TasteSelect.styles'
import * as S from './SongSelect.styles'

type Song = { title: string; artist: string; albumImage: string }

type SongSelectProps = {
  songs: Song[]
  onAddSong: (song: Song) => void
}

export function SongSelect({ songs, onAddSong }: SongSelectProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
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
          <S.SongSearch
            type="search"
            readOnly
            placeholder="노래 검색하기"
            aria-label="노래 검색"
            onClick={() => setIsSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setIsSearchOpen(true)
            }}
          />
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

      {isSearchOpen && (
        <SongSearchSheet
          variant="profile"
          hiddenTitle="좋아하는 노래"
          onAdd={({ title, artist, albumImageUrl }) =>
            onAddSong({ title, artist, albumImage: albumImageUrl })
          }
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  )
}
