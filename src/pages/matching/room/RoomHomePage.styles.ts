import styled from 'styled-components'

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

export const Empty = styled.p`
  padding: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
