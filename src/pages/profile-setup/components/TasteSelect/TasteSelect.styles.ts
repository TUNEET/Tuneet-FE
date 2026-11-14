import styled from 'styled-components'
import { glassSurface } from '../PlatformConnect/PlatformConnect.styles'

export {
  ArtistFallback,
  ArtistSearch,
  GenreChip,
  GenreRow,
  GenreRows,
  PanelHeader,
  PanelIcon,
  PanelLabel,
  RemoveArtistButton,
  SelectedArtist,
  SelectedArtists,
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
