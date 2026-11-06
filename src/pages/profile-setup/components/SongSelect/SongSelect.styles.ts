import styled from 'styled-components'
import { ArtistSearch } from '../TasteSelect/TasteSelect.styles'

export { Panels } from '../TasteSelect/TasteSelect.styles'

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

export const Song = styled.li`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3rem;
  padding: 0 1rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.primary};

  img:first-child {
    flex-shrink: 0;
    border-radius: 9999px;
  }

  span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const SongNote = styled.img`
  flex-shrink: 0;
  width: 0.692rem;
  height: 0.867rem;
`
