import styled from 'styled-components'

export {
  BlockedSheet as LikedSheet,
  ExitButton,
  Header,
  Info,
  List,
  Row,
  Section,
  Title,
} from '../BlockedUsers/BlockedUsers.styles'

export const Cover = styled.div`
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 0.4rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const SongTitle = styled.p`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  letter-spacing: 0.024rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textProfile};
`

export const Artist = styled.p`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Empty = styled.p`
  padding: 2rem 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
