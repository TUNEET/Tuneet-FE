import styled, { css } from 'styled-components'

export type ChipVariant = 'filled' | 'soft'

export const Chip = styled.span<{ $variant: ChipVariant }>`
  display: inline-flex;
  align-items: center;
  height: 1.8rem;
  padding: 0 0.8rem;
  border-radius: 1000px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  white-space: nowrap;

  ${({ $variant, theme }) =>
    $variant === 'filled'
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.surfaceWhite};
        `
      : css`
          background-color: ${theme.colors.surfacePink};
          color: ${theme.colors.textPlaceholder};
        `}
`
