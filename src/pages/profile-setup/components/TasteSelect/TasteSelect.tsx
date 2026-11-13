import { useState } from 'react'
import trashIcon from '@/assets/icons/trash_icon.svg'
import { GENRE_ROWS } from '@/constants/genres'
import type { ProfileArtist } from '@/mocks/profile'
import { ArtistSearchSheet } from '../ArtistSearchSheet/ArtistSearchSheet'
import * as S from './TasteSelect.styles'

type TasteSelectProps = {
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
  selectedArtists: ProfileArtist[]
  onAddArtist: (artist: ProfileArtist) => void
  onRemoveArtist: (name: string) => void
}

export function TasteSelect({
  selectedGenres,
  onToggleGenre,
  selectedArtists,
  onAddArtist,
  onRemoveArtist,
}: TasteSelectProps) {
  const [isGenreOpen, setIsGenreOpen] = useState(false)
  const [isArtistOpen, setIsArtistOpen] = useState(false)
  const [isArtistSearchOpen, setIsArtistSearchOpen] = useState(false)

  return (
    <>
      <S.Panels>
        <S.Panel $openHeight="17.9rem" $isOpen={isGenreOpen}>
          <S.PanelHeader
            type="button"
            aria-expanded={isGenreOpen}
            onClick={() => setIsGenreOpen((isOpen) => !isOpen)}
          >
            <S.PanelIcon $isOpen={isGenreOpen}>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden>
                <path d="m1 1 4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </S.PanelIcon>
            <S.PanelLabel>장르 선택</S.PanelLabel>
          </S.PanelHeader>
          {isGenreOpen && (
            <S.GenreRows>
              {GENRE_ROWS.map((row) => (
                <S.GenreRow key={row[0]}>
                  {row.map((genre) => {
                    const isSelected = selectedGenres.includes(genre)

                    return (
                      <S.GenreChip
                        key={genre}
                        type="button"
                        aria-pressed={isSelected}
                        $isSelected={isSelected}
                        onClick={() => onToggleGenre(genre)}
                      >
                        {genre}
                      </S.GenreChip>
                    )
                  })}
                </S.GenreRow>
              ))}
            </S.GenreRows>
          )}
        </S.Panel>

        <S.Panel
          $openHeight={selectedArtists.length > 0 ? 'auto' : '9.7rem'}
          $isOpen={isArtistOpen}
        >
          <S.PanelHeader
            type="button"
            aria-expanded={isArtistOpen}
            onClick={() => setIsArtistOpen((isOpen) => !isOpen)}
          >
            <S.PanelIcon $isOpen={isArtistOpen}>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden>
                <path d="m1 1 4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </S.PanelIcon>
            <S.PanelLabel>아티스트 선택</S.PanelLabel>
          </S.PanelHeader>
          {isArtistOpen && (
            <S.ArtistSearch
              type="search"
              readOnly
              placeholder="아티스트 검색하기"
              aria-label="아티스트 검색"
              onClick={() => setIsArtistSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setIsArtistSearchOpen(true)
              }}
            />
          )}
          {isArtistOpen && selectedArtists.length > 0 && (
            <S.SelectedArtists>
              {selectedArtists.map(({ name, image }) => (
                <S.SelectedArtist key={name}>
                  <img src={image} alt="" width={12} height={12} />
                  <span>{name}</span>
                  <S.RemoveArtistButton
                    type="button"
                    aria-label={`${name} 삭제`}
                    onClick={() => onRemoveArtist(name)}
                  >
                    <img src={trashIcon} alt="" width={10} height={10} />
                  </S.RemoveArtistButton>
                </S.SelectedArtist>
              ))}
            </S.SelectedArtists>
          )}
        </S.Panel>
      </S.Panels>

      {isArtistSearchOpen && (
        <ArtistSearchSheet onAdd={onAddArtist} onClose={() => setIsArtistSearchOpen(false)} />
      )}
    </>
  )
}
