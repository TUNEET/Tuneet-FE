import styled from 'styled-components'

export type LikeButtonTone = 'blue' | 'rose'

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
  color: ${({ theme, $tone }) => theme.colors[TONE_COLORS[$tone]]};
  cursor: pointer;
`
