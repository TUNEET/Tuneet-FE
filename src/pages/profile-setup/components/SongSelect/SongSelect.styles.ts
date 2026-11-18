import styled from 'styled-components'
import { ArtistSearch } from '../TasteSelect/TasteSelect.styles'

export { Panels } from '../TasteSelect/TasteSelect.styles'
export { SongChip as Song } from '@/styles/song'
export { RemoveArtistButton as RemoveSongButton } from '../TasteSelect/TasteSelect.styles'

export const SongSearch = styled(ArtistSearch)``

export const Songs = styled.ul`
  position: absolute;
  top: 8.7rem;
  right: 1.5rem;
  left: 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export { CoverFallback } from '@/components/common/SongSearchSheet/SongSearchSheet.styles'
