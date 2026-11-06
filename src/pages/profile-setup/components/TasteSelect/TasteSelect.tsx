import { useState } from 'react'
import { GENRE_ROWS } from '@/constants/genres'
import * as S from './TasteSelect.styles'

type TasteSelectProps = {
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
}

export function TasteSelect({ selectedGenres, onToggleGenre }: TasteSelectProps) {
  const [isGenreOpen, setIsGenreOpen] = useState(false)
  const [isArtistOpen, setIsArtistOpen] = useState(false)

  return (
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

      <S.Panel $openHeight="9.7rem" $isOpen={isArtistOpen}>
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
            placeholder="아티스트 검색하기"
            aria-label="아티스트 검색"
          />
        )}
      </S.Panel>
    </S.Panels>
  )
}
