import styled from 'styled-components'

export type ChipVariant = 'filled' | 'soft'
export type ChipTone = 'pink' | 'purple'

const COLORS = {
  pink: {
    filled: { background: 'primary', text: 'surfaceWhite' },
    soft: { background: 'surfacePink', text: 'textPlaceholder' },
  },
  purple: {
    filled: { background: 'lavender', text: 'surfaceWhite' },
    soft: { background: 'lavenderLight', text: 'lavender' },
  },
} as const

export const Chip = styled.span<{ $variant: ChipVariant; $tone: ChipTone }>`
  display: inline-flex;
  align-items: center;
  height: 1.8rem;
  padding: 0 0.8rem;
  border-radius: 1000px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  white-space: nowrap;
  background-color: ${({ theme, $tone, $variant }) =>
    theme.colors[COLORS[$tone][$variant].background]};
  color: ${({ theme, $tone, $variant }) => theme.colors[COLORS[$tone][$variant].text]};
`
