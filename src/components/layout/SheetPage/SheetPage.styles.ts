import styled from 'styled-components'

export type SheetTone = 'default' | 'letter'

const SHEET_BACKGROUNDS = {
  default: 'surfaceWhite',
  letter: 'letterBackground',
} as const

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(var(--frame-height) - var(--header-height) - var(--bottom-nav-height));
`

export const Sheet = styled.div<{ $tone: SheetTone }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem 3rem;
  border-radius: 2.4rem 2.4rem 0 0;
  background-color: ${({ theme, $tone }) => theme.colors[SHEET_BACKGROUNDS[$tone]]};
`
