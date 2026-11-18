import styled, { css } from 'styled-components'

export type LikeButtonTone = 'blue' | 'rose' | 'roseBadge'

const TONE_COLORS = { blue: 'blue', rose: 'primary' } as const

export const Button = styled.button<{ $tone: LikeButtonTone }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  ${({ theme, $tone }) =>
    $tone === 'roseBadge'
      ? css`
          /* 분홍 원 안에 하트 아이콘을 올린다. 하트 색은 아이콘 파일에 들어 있다 */
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 9999px;
          background-color: ${theme.colors.primary};
        `
      : css`
          color: ${theme.colors[TONE_COLORS[$tone]]};
        `}
`
