import styled, { css } from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 6rem;
  text-align: center;
`

export const Character = styled.img`
  width: 9.5rem;
  height: 11.7rem;
  object-fit: contain;
`

export const Title = styled.h1`
  margin-top: 3rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  margin-top: 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.2rem;
`

export const ActionButton = styled.button<{ $variant: 'filled' | 'outline' }>`
  width: 22.5rem;
  height: 3.8rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.02em;

  ${({ $variant, theme }) =>
    $variant === 'filled'
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.surfaceWhite};
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.primary};
        `}
`
