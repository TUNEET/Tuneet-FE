import styled, { css } from 'styled-components'

export { SongLabel as Song, SongList as List } from '@/styles/song'

export const Item = styled.li<{ $pressable: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  ${({ $pressable }) =>
    $pressable &&
    css`
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
    `}
`

export const Pill = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;
  height: 3rem;
  padding: 0 1.1rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
  letter-spacing: 0.02rem;
  overflow: hidden;
`

export const PlayButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  border-radius: 10rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`
