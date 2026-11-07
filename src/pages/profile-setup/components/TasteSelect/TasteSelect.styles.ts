import styled, { css } from 'styled-components'
import { glassSurface } from '../PlatformConnect/PlatformConnect.styles'

export const Panels = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 39.5rem;
  margin: 26.6rem 3rem 0;
  padding-bottom: 2rem;
`

export const Panel = styled.div<{ $openHeight: string; $isOpen: boolean }>`
  ${glassSurface}
  position: relative;
  height: ${({ $isOpen, $openHeight }) => ($isOpen ? $openHeight : '4.8rem')};
  overflow: hidden;
  border-radius: 2.4rem;
`

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

export const SelectedArtists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 25rem;
  margin: 3.9rem 0 2.2rem 5.5rem;
`

export const SelectedArtist = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  img {
    flex-shrink: 0;
    border-radius: 9999px;
  }

  span {
    white-space: nowrap;
  }
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
