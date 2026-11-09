import styled from 'styled-components'

/* 하단 탭이 있는 화면(홈·탐색·마이 등)이 함께 쓰는 스타일 */

export const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(var(--frame-height) - var(--header-height) - var(--bottom-nav-height));
`

export const Glows = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

export const Glow = styled.div<{
  $size: string
  $top: string
  $left: string
  $color: string
  $blur: string
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  filter: blur(${({ $blur }) => $blur});
`

export const Greeting = styled.h1`
  position: relative;
  margin: 3rem 3rem 0;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
  line-height: 3rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Sheet = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem 3rem;
  border-radius: 2.4rem 2.4rem 0 0;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const BottomFade = styled.div`
  position: fixed;
  bottom: var(--bottom-nav-height);
  left: 0;
  width: 100%;
  height: 17rem;
  background: linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, rgba(250, 250, 250, 0.8) 100%);
  pointer-events: none;
`
