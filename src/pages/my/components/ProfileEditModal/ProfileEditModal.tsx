import heartOutlineIcon from '@/assets/icons/heart-outline.svg'
import { Modal } from '@/components/common/Modal/Modal'
import { GENRE_ROWS } from '@/constants/genres'
import * as S from './ProfileEditModal.styles'

type ProfileEditModalProps = {
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
  onClose: () => void
}

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
  onClose,
}: ProfileEditModalProps) {
  return (
    <Modal open onClose={onClose} labelledBy="profile-edit-song">
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

        <S.Panel $height="9.7rem">
          <S.PanelHeader as="div">
            <Chevron />
            <S.PanelLabel>아티스트 선택</S.PanelLabel>
          </S.PanelHeader>
          <S.Search type="search" placeholder="아티스트 검색하기" aria-label="아티스트 검색" />
        </S.Panel>
      </S.Panels>
    </Modal>
  )
}
