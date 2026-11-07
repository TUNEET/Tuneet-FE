import styled, { css, keyframes } from 'styled-components'
import { Item, List, PlayButton, Song } from '../../../components/Playlist/Playlist.styles'

export type SongSearchSheetVariant = 'playlist' | 'profile' | 'explore'

type VariantProps = { $variant: SongSearchSheetVariant }

const VARIANT_COLORS = {
  playlist: {
    sheet: 'surfaceLavender',
    title: 'lavender',
    field: 'lavenderLight',
    text: 'textPrimary',
    placeholder: 'textMuted',
  },
  profile: {
    sheet: 'surfacePink',
    title: 'primary',
    field: 'border',
    text: 'textHeading',
    placeholder: 'textPlaceholder',
  },
  explore: {
    sheet: 'surfaceBlue',
    title: 'blue',
    field: 'inputBlue',
    text: 'textPrimary',
    placeholder: 'textBody',
  },
} as const

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

export const Overlay = styled.div<VariantProps>`
  position: fixed;
  inset: 0 0 ${({ $variant }) => ($variant === 'playlist' ? 'var(--bottom-nav-height)' : '0')};
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s ease-out;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  animation: ${slideUp} 0.25s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const CloseButton = styled.button`
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: white;
`

export const Sheet = styled.div<VariantProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 42.6rem;
  padding: 0.9rem 3rem 0;
  overflow: hidden;
  border-radius: 2.4rem 2.4rem 0 0;
  background-color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].sheet]};

  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 17rem;
    background: linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, rgba(250, 250, 250, 0.8) 100%);
    pointer-events: none;
  }

  ${({ $variant }) =>
    $variant !== 'playlist' &&
    css`
      height: 50rem;

      &::before {
        display: none;
      }
    `}
`

export const Title = styled.h2<VariantProps & { $isHidden: boolean }>`
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  display: flex;
  align-items: center;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].title]};
`

export const SearchInput = styled.input<VariantProps>`
  flex-shrink: 0;
  width: 100%;
  height: 2.8rem;
  margin-top: 1rem;
  padding: 0 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].field]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  text-align: center;
  color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].text]};

  &::placeholder {
    color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].placeholder]};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  ${({ $variant }) =>
    $variant !== 'playlist' &&
    css`
      font-weight: 600;
      letter-spacing: 0.02rem;

      &::placeholder {
        font-weight: 500;
      }
    `}
`

export const ResultList = styled(List)`
  width: 100%;
  margin-top: 2rem;
`

export const ResultItem = styled(Item)<VariantProps>`
  position: relative;
  background-color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].field]};

  ${({ $variant, theme }) =>
    $variant !== 'playlist' &&
    css`
      p {
        letter-spacing: 0.02rem;
        color: ${theme.colors[VARIANT_COLORS[$variant].text]};
      }
    `}
`

export const ResultSong = Song

export const AddButton = PlayButton

export const Pagination = styled.div<VariantProps>`
  position: absolute;
  right: 3rem;
  bottom: ${({ $variant }) => ($variant === 'playlist' ? '5rem' : '12.4rem')};
  left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PageButton = styled.button<{
  $direction: 'prev' | 'next'
  $variant?: SongSearchSheetVariant
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme, $variant }) =>
    $variant === 'explore' ? theme.colors.blue : theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};

  svg {
    transform: ${({ $direction }) => ($direction === 'prev' ? 'scaleX(-1)' : 'none')};
  }

  &:disabled {
    background-color: ${({ theme, $variant }) =>
      $variant === 'explore' ? theme.colors.inputBlue : theme.colors.border};
    color: ${({ theme, $variant }) =>
      $variant === 'explore' ? theme.colors.textSecondary : theme.colors.textPlaceholder};
    cursor: default;
  }
`

export const PageLabel = styled.span<VariantProps>`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: ${({ $variant }) => ($variant === 'playlist' ? 'normal' : '0.02rem')};
  color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].text]};
`

export const Empty = styled.div<VariantProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 6.3rem;

  img {
    width: 9.9rem;
    height: 11.1rem;
    margin-left: 0.6rem;
    object-fit: contain;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    line-height: 2rem;
    text-align: center;
    letter-spacing: ${({ $variant }) => ($variant === 'playlist' ? 'normal' : '0.032rem')};
    color: ${({ theme, $variant }) => theme.colors[VARIANT_COLORS[$variant].text]};
  }
`
