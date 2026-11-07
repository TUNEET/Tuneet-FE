import styled, { keyframes } from 'styled-components'
import { Item, List, PlayButton, Song } from '../../../components/Playlist/Playlist.styles'

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

export const Overlay = styled.div`
  position: fixed;
  inset: 0 0 var(--bottom-nav-height);
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

export const Sheet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 42.6rem;
  padding: 0.9rem 3rem 0;
  overflow: hidden;
  border-radius: 2.4rem 2.4rem 0 0;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};

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
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.lavender};
`

export const SearchInput = styled.input`
  flex-shrink: 0;
  width: 100%;
  height: 2.8rem;
  margin-top: 1rem;
  padding: 0 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.lavenderLight};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

export const ResultList = styled(List)`
  width: 100%;
  margin-top: 2rem;
`

export const ResultItem = styled(Item)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.lavenderLight};
`

export const ResultSong = Song

export const AddButton = PlayButton

export const Pagination = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 5rem;
  left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PageButton = styled.button<{ $direction: 'prev' | 'next' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};

  svg {
    transform: ${({ $direction }) => ($direction === 'prev' ? 'scaleX(-1)' : 'none')};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPlaceholder};
    cursor: default;
  }
`

export const PageLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Empty = styled.div`
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
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`
