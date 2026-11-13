import styled from 'styled-components'
import { glassSurface } from '../PlatformConnect/PlatformConnect.styles'

export {
  ArtistSearch,
  GenreChip,
  GenreRow,
  GenreRows,
  PanelHeader,
  PanelIcon,
  PanelLabel,
} from '@/styles/tastePanel'

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

  & > img {
    flex-shrink: 0;
    border-radius: 9999px;
  }

  span {
    white-space: nowrap;
  }
`

export const RemoveArtistButton = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
`
