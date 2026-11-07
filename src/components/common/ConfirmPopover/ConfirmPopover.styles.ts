import styled, { keyframes } from 'styled-components'

export type ConfirmPopoverSurface = 'light' | 'dim' | 'letter' | 'sheet'
export type ConfirmPopoverPlacement = 'top' | 'bottom'
export type ConfirmPopoverTone = 'danger' | 'default' | 'muted'

const SURFACES = {
  light: {
    popover: 'rgba(250, 250, 250, 0.2)',
    button: 'rgba(234, 234, 234, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 3rem rgba(0, 0, 0, 0.08)',
    paddingBottom: '1rem',
  },
  dim: {
    popover: 'rgba(250, 250, 250, 0.7)',
    button: 'rgba(234, 234, 234, 0.7)',
    border: 'none',
    shadow: 'none',
    paddingBottom: '1rem',
  },
  letter: {
    popover: 'rgba(250, 250, 250, 0.4)',
    button: 'rgba(234, 234, 234, 0.7)',
    border: 'none',
    shadow: 'none',
    paddingBottom: '1rem',
  },
  sheet: {
    popover: 'rgba(250, 250, 250, 0.7)',
    button: 'rgba(234, 234, 234, 0.7)',
    border: 'none',
    shadow: '0 0 3rem rgba(0, 0, 0, 0.08)',
    paddingBottom: '1.5rem',
  },
}

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const Popover = styled.div<{
  $surface: ConfirmPopoverSurface
  $placement: ConfirmPopoverPlacement
}>`
  position: absolute;
  ${({ $placement }) => ($placement === 'top' ? 'bottom' : 'top')}: calc(100% + 1rem);
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20.8rem;
  padding: 1.5rem 1rem ${({ $surface }) => SURFACES[$surface].paddingBottom};
  border: ${({ $surface }) => SURFACES[$surface].border};
  border-radius: 2.4rem;
  background-color: ${({ $surface }) => SURFACES[$surface].popover};
  box-shadow: ${({ $surface }) => SURFACES[$surface].shadow};
  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
  transform-origin: ${({ $placement }) => $placement} right;
  animation: ${popIn} 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Message = styled.p`
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const ConfirmButton = styled.button<{
  $surface: ConfirmPopoverSurface
  $tone: ConfirmPopoverTone
}>`
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  background-color: ${({ $surface }) => SURFACES[$surface].button};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme, $tone }) =>
    ({
      danger: theme.colors.danger,
      default: theme.colors.blue,
      muted: theme.colors.textPlaceholder,
    })[$tone]};
  transition: background-color 0.15s;

  &:active {
    background-color: rgba(210, 210, 210, 0.8);
  }
`
