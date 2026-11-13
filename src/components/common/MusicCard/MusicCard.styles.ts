import styled, { css } from 'styled-components'

export type MusicCardTone = 'blue' | 'purple' | 'rose'

const TONES = {
  blue: { background: 'surfaceBlue', text: 'blue', title: 'textPrimary', description: 'textBody' },
  purple: {
    background: 'surfaceLavender',
    text: 'purple',
    title: 'textPrimary',
    description: 'textBody',
  },
  rose: {
    background: 'background',
    text: 'primary',
    title: 'textHeading',
    description: 'textPlaceholder',
  },
} as const

const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const wrap = css`
  overflow-wrap: anywhere;
`

export const Card = styled.article<{ $tone: MusicCardTone; $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme, $tone }) => theme.colors[TONES[$tone].background]};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

export const Caption = styled.span<{ $tone: MusicCardTone }>`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: 1.4rem;
  color: ${({ theme, $tone }) => theme.colors[TONES[$tone].text]};
`

export const Body = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`

export const Main = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: ${({ $expanded }) => ($expanded ? 'flex-start' : 'center')};
  gap: 1rem;
  min-width: 0;
`

export const Action = styled.div`
  display: flex;
  flex-shrink: 0;
`

export const Thumbnail = styled.div<{ $playable: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ $playable, theme }) =>
    $playable &&
    css`
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.2);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1.2rem;
        height: 1.2rem;
        border: 0.2rem solid ${theme.colors.surfaceWhite};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
`

export const Title = styled.p<{ $tone: MusicCardTone; $expanded: boolean }>`
  ${({ $expanded }) => ($expanded ? wrap : ellipsis)}
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.8rem;
  color: ${({ theme, $tone }) => theme.colors[TONES[$tone].title]};
`

export const Description = styled.p<{ $tone: MusicCardTone; $expanded: boolean }>`
  ${({ $expanded }) => ($expanded ? wrap : ellipsis)}
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme, $tone }) => theme.colors[TONES[$tone].description]};
`
