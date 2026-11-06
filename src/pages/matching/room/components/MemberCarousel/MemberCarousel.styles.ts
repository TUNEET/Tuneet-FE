import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin: 0 -3rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 3.5rem;
    height: 100%;
    background: linear-gradient(270deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%);
    pointer-events: none;
  }
`

export const List = styled.ul`
  display: flex;
  gap: 1rem;
  padding: 0 3rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Card = styled.li<{ $owner: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  gap: 0.8rem;
  width: 7.2rem;
  height: 9rem;
  padding-top: 0.8rem;
  border: 1px solid ${({ $owner, theme }) => ($owner ? theme.colors.purple : 'transparent')};
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 0 0.4rem;
  text-align: center;
`

export const Nickname = styled.p`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Role = styled.p<{ $owner: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ $owner, theme }) => ($owner ? theme.colors.purple : theme.colors.textSecondary)};
`
