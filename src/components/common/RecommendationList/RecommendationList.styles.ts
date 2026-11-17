import styled from 'styled-components'

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Message = styled.p`
  padding: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
