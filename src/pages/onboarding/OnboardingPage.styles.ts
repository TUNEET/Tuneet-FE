import styled, { css } from 'styled-components'

const shiftUp = (top: number, min: number) =>
  `max(${min}rem, calc(${top}rem + var(--shrink) * 0.5))`

export const Page = styled.div`
  --shrink: min(0rem, calc(var(--frame-height) - 85.2rem));

  position: relative;
  height: var(--frame-height);
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Blob = styled.div`
  position: absolute;
  top: calc(100% - 3.8rem);
  left: -10.2rem;
  width: 61.7rem;
  height: 61.3rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 800px 800px 800px;
  filter: blur(400px);
`

export const Heading = styled.h1`
  position: absolute;
  top: ${shiftUp(16, 10)};
  left: 3rem;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 800;
  line-height: 4rem;
  letter-spacing: 0.06rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Links = styled.nav`
  position: absolute;
  right: 3rem;
  bottom: 3.6rem;
  left: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }
`

export const Logo = styled.img`
  position: absolute;
  top: ${shiftUp(12, 6)};
  left: 3rem;
  width: 11.3rem;
  height: 2rem;
`

export const Buttons = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 7.7rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  height: 5rem;
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  letter-spacing: 0.032rem;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.surfaceWhite};
        `
      : css`
          background-color: ${theme.colors.surfaceWhite};
          color: ${theme.colors.primary};
        `}
`

export const Character = styled.img`
  position: absolute;
  bottom: 18.4rem;
  left: 3rem;
  width: 12.4rem;
  height: 17.5rem;
  pointer-events: none;
`

export const Accent = styled.img`
  position: absolute;
  bottom: 31.7rem;
  left: 14.1rem;
  width: 1.1rem;
  height: 1rem;
  pointer-events: none;
`
