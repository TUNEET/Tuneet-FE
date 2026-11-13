import { useState } from 'react'
import heartFilledIcon from '@/assets/icons/heart-filled.svg'
import heartOutlineIcon from '@/assets/icons/heart-outline.svg'
import trashIcon from '@/assets/icons/trash_icon.svg'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { Panel, PanelHeader, PanelIcon, PanelLabel } from '../TasteSelect/TasteSelect.styles'
import * as S from './SongSelect.styles'

type Song = { title: string; artist: string; albumImage: string }

type SongSelectProps = {
  songs: Song[]
  onAddSong: (song: Song) => void
  onRemoveSong: (song: Song) => void
}

export function SongSelect({ songs, onAddSong, onRemoveSong }: SongSelectProps) {
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
              {songs.map((song) => (
                <S.Song key={`${song.title}-${song.artist}`}>
                  <img src={song.albumImage} alt="" width={12} height={12} />
                  <span>
                    {song.title} - {song.artist}
                  </span>
                  <S.RemoveSongButton
                    type="button"
                    aria-label={`${song.title} 삭제`}
                    onClick={() => onRemoveSong(song)}
                  >
                    <img src={trashIcon} alt="" width={10} height={10} />
                  </S.RemoveSongButton>
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
