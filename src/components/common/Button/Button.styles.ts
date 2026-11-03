import styled, { css } from 'styled-components'

export type ButtonVariant = 'filled' | 'outline'

export const Button = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lavender};
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  white-space: nowrap;

  ${({ $variant, theme }) =>
    $variant === 'filled'
      ? css`
          background-color: ${theme.colors.lavender};
          color: ${theme.colors.surfaceWhite};
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.lavender};
        `}

  &:disabled {
    border-color: ${({ theme }) => theme.colors.divider};
    background-color: ${({ theme }) => theme.colors.divider};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: default;
  }
`
