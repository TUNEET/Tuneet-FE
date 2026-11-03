import { css } from 'styled-components'

export const FRAME_BREAKPOINT = '@media (min-width: 768px)'
export const FRAME_MAX_WIDTH = '393px'
export const FRAME_MAX_HEIGHT = '852px'

export const frameWidth = css`
  width: 100%;

  ${FRAME_BREAKPOINT} {
    width: min(${FRAME_MAX_WIDTH}, 100vw);
  }
`
