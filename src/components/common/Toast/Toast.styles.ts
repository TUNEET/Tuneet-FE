import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.8rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Viewport = styled.div`
  position: fixed;
  right: 0;
  bottom: calc(var(--bottom-nav-height) + 2rem);
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  padding: 0 3rem;
  pointer-events: none;
`

export const Toast = styled.div`
  padding: 1rem 1.6rem;
  border-radius: 100px;
  background-color: rgba(57, 44, 55, 0.9);
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
  text-align: center;
  animation: ${slideUp} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
