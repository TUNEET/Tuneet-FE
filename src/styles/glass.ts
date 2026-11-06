import { css } from 'styled-components'

export const glass = css`
  position: relative;
  overflow: hidden;
  border: 0.3px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.05);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.06),
    inset 0 0 6px 1px rgba(255, 255, 255, 0.15);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0) 70%,
      rgba(255, 255, 255, 0.3) 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`
