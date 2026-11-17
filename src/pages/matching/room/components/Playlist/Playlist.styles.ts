import styled, { css } from 'styled-components'
import { SongItem } from '@/styles/song'

export { PlayButton, SongLabel as Song, SongList as List } from '@/styles/song'

export const Item = styled(SongItem)<{ $pressable: boolean }>`
  position: relative;

  ${({ $pressable }) =>
    $pressable &&
    css`
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
    `}
`
