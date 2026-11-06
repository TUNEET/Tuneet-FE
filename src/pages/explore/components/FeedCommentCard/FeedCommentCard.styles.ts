import styled from 'styled-components'

export { CommentInput, Label, SearchInput } from '@/pages/explore/write/ExploreWritePage.styles'

export const Card = styled.div`
  width: 100%;
  padding-top: 1rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceBlue};
`

export const Top = styled.div`
  display: flex;
  justify-content: center;
  height: 2.6rem;
`

export const Divider = styled.hr`
  margin: 1rem 2.8rem 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.inputBlue};
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.9rem 2.8rem 2rem 5.5rem;
`

export const SongSlot = styled.div`
  height: 3rem;
`

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
`
