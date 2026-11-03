import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2.2rem;
`

export const Name = styled.h1`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Description = styled.p`
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`
