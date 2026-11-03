import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Action = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`
