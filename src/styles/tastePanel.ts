import styled, { css } from 'styled-components'

/* 장르·아티스트 선택 패널 (프로필 설정, 프로필 수정) */

export const PanelHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 4.8rem;
  padding: 0 1rem 0 1.5rem;
`

export const PanelIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: black;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'none')};
`

export const PanelLabel = styled.span`
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const GenreRows = styled.div`
  position: absolute;
  top: 4.9rem;
  left: 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25rem;
`

export const GenreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const GenreChip = styled.button<{ $isSelected: boolean }>`
  flex-shrink: 0;
  padding: 0.8rem;
  border-radius: 1000px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  white-space: nowrap;

  ${({ $isSelected, theme }) =>
    $isSelected
      ? css`
          outline: 1px solid ${theme.colors.primary};
          outline-offset: -1px;
          background-color: ${theme.colors.primary};
          color: ${theme.colors.surfaceWhite};
        `
      : css`
          outline: 1px solid ${theme.colors.textPlaceholder};
          outline-offset: -1px;
          color: ${theme.colors.textPlaceholder};
        `}
`

export const ArtistSearch = styled.input`
  position: absolute;
  top: 4.9rem;
  left: 5.5rem;
  width: 25rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHeading};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPlaceholder};
  }
`
