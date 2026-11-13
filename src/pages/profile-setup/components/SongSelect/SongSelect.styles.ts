import styled from 'styled-components'
import { ArtistSearch } from '../TasteSelect/TasteSelect.styles'

export { Panels } from '../TasteSelect/TasteSelect.styles'
export { SongChip as Song } from '@/styles/song'
export { RemoveArtistButton as RemoveSongButton } from '../TasteSelect/TasteSelect.styles'

export const SongSearch = styled(ArtistSearch)``

export const Songs = styled.ul`
  position: absolute;
  top: 8.7rem;
  left: 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25rem;
`
