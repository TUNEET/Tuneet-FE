import styled from 'styled-components'

export const Question = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lavender};
  }
`
