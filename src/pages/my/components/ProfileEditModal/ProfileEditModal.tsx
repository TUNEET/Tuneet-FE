import { useState } from 'react'
import heartOutlineIcon from '@/assets/icons/heart-outline.svg'
import trashIcon from '@/assets/icons/trash_icon.svg'
import { ArtistSearchSheet } from '@/components/common/ArtistSearchSheet/ArtistSearchSheet'
import { Modal } from '@/components/common/Modal/Modal'
import { GENRE_ROWS } from '@/constants/genres'
import type { ProfileArtist } from '@/types/music'
import * as S from './ProfileEditModal.styles'

type ProfileEditModalProps = {
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
  selectedArtists: ProfileArtist[]
  onAddArtist: (artist: ProfileArtist) => void
  onRemoveArtist: (artist: ProfileArtist) => void
  onClose: () => void
}

const noop = () => {}

function Chevron() {
  return (
    <S.PanelIcon $isOpen>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden>
        <path d="m1 1 4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </S.PanelIcon>
  )
}

export function ProfileEditModal({
  selectedGenres,
  onToggleGenre,
  selectedArtists,
  onAddArtist,
  onRemoveArtist,
  onClose,
}: ProfileEditModalProps) {
  const [isArtistSearchOpen, setIsArtistSearchOpen] = useState(false)

  return (
    <>
      {/* 검색 시트가 열려 있으면 ESC로 시트만 닫히게 모달 닫기를 막는다 */}
      <Modal open onClose={isArtistSearchOpen ? noop : onClose} labelledBy="profile-edit-song">
        <S.Panels>
          <S.Panel $height="9.7rem">
            <S.PanelHeader as="div">
              <S.PanelIcon $isOpen={false}>
                <img src={heartOutlineIcon} alt="" width={12} height={11} />
              </S.PanelIcon>
              <S.PanelLabel id="profile-edit-song">좋아하는 노래</S.PanelLabel>
            </S.PanelHeader>
            <S.Search type="search" placeholder="노래 검색하기" aria-label="노래 검색" />
          </S.Panel>

          <S.Panel $height="17.9rem">
            <S.PanelHeader as="div">
              <Chevron />
              <S.PanelLabel>장르 선택</S.PanelLabel>
            </S.PanelHeader>
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
          </S.Panel>

          <S.Panel $height={selectedArtists.length > 0 ? 'auto' : '9.7rem'}>
            <S.PanelHeader as="div">
              <Chevron />
              <S.PanelLabel>아티스트 선택</S.PanelLabel>
            </S.PanelHeader>
            <S.Search
              type="search"
              readOnly
              placeholder="아티스트 검색하기"
              aria-label="아티스트 검색"
              onClick={() => setIsArtistSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setIsArtistSearchOpen(true)
              }}
            />
            {selectedArtists.length > 0 && (
              <S.SelectedArtists>
                {selectedArtists.map((artist) => (
                  <S.SelectedArtist key={artist.id ?? artist.name}>
                    {artist.image ? (
                      <img src={artist.image} alt="" width={12} height={12} />
                    ) : (
                      <S.ArtistFallback />
                    )}
                    <span>{artist.name}</span>
                    <S.RemoveArtistButton
                      type="button"
                      aria-label={`${artist.name} 삭제`}
                      onClick={() => onRemoveArtist(artist)}
                    >
                      <img src={trashIcon} alt="" width={10} height={10} />
                    </S.RemoveArtistButton>
                  </S.SelectedArtist>
                ))}
              </S.SelectedArtists>
            )}
          </S.Panel>
        </S.Panels>
      </Modal>

      {isArtistSearchOpen && (
        <ArtistSearchSheet onAdd={onAddArtist} onClose={() => setIsArtistSearchOpen(false)} />
      )}
    </>
  )
}
