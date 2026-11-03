import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(var(--frame-height) - var(--header-height) - var(--bottom-nav-height));
`

export const Sheet = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem 3rem;
  border-radius: 2.4rem 2.4rem 0 0;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`
