import styled, { css } from 'styled-components'

export type LikeButtonTone = 'blue' | 'lavender' | 'rose' | 'roseBadge'

const TONE_COLORS = { blue: 'blue', lavender: 'lavender', rose: 'primary' } as const

export const Button = styled.button<{ $tone: LikeButtonTone; $size: number }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size / 10}rem;
  height: ${({ $size }) => $size / 10}rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  ${({ theme, $tone }) =>
    $tone === 'roseBadge'
      ? css`
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 9999px;
          background-color: ${theme.colors.primary};
        `
      : css`
          color: ${theme.colors[TONE_COLORS[$tone]]};
        `}
`
