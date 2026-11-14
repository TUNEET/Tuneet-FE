import styled from 'styled-components'
import { ArtistSearch, PanelIcon as BasePanelIcon } from '@/styles/tastePanel'

export {
  ArtistFallback,
  GenreChip,
  GenreRow,
  GenreRows,
  PanelHeader,
  PanelLabel,
  RemoveArtistButton,
  SelectedArtist,
  SelectedArtists,
} from '@/styles/tastePanel'

export const Panels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const Panel = styled.div<{ $height: string }>`
  position: relative;
  flex-shrink: 0;
  height: ${({ $height }) => $height};
  overflow: hidden;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.border};
`

export const PanelIcon = styled(BasePanelIcon)`
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Search = styled(ArtistSearch)`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.textPlaceholder};
  color: ${({ theme }) => theme.colors.surfaceWhite};

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }

  &:focus {
    outline: none;
  }
`
