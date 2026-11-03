import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Remaining = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lavender};
  }
`
