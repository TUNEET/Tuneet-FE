import styled from 'styled-components'
import { CardList, Sheet } from '@/pages/home/HomePage.styles'
import { HeaderAction, ProfileTitle } from '../../MyPage.styles'

export { Section } from '@/pages/home/HomePage.styles'

export const BlockedSheet = Sheet

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Title = ProfileTitle

export const ExitButton = HeaderAction

export const List = styled(CardList).attrs({ as: 'ul' })``

export const Row = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 6rem;
  padding: 0 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfacePink};
`

export const Avatar = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 1000px;
  background-color: #ecbeda;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  img {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1;
  }
`

export const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`

export const Nickname = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  letter-spacing: 0.024rem;
  color: ${({ theme }) => theme.colors.textProfile};
`

export const BlockedDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const UnblockButton = styled.button`
  flex-shrink: 0;
  width: 5.4rem;
  height: 2rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  text-align: center;
  white-space: nowrap;
  color: #ce8eb7;
`
