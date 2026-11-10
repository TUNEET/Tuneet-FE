import styled from 'styled-components'
import { Sheet } from '@/styles/tabPage'

export { BottomFade, CardList, Glow, Glows, Page, Section } from '@/styles/tabPage'

export const ExploreSheet = styled(Sheet)`
  margin-top: 3rem;
`

export const NotificationHeader = styled.div`
  position: relative;
`

export const Empty = styled.p`
  padding: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
