import { createGlobalStyle } from 'styled-components'
import passwordMaskFont from '@/assets/fonts/password-mask.woff'
import { BOTTOM_NAV_HEIGHT, FRAME_BREAKPOINT, FRAME_MAX_HEIGHT, HEADER_HEIGHT } from './layout'

export const GlobalStyle = createGlobalStyle`
  /* 비밀번호 칸의 가림 문자(•, ●)만 * 모양으로 표시한다. */
  @font-face {
    font-family: 'PasswordMask';
    src: url(${passwordMaskFont}) format('woff');
    unicode-range: U+2022, U+25CF;
  }

  :root {
    --header-height: ${HEADER_HEIGHT};
    --bottom-nav-height: ${BOTTOM_NAV_HEIGHT};
    --frame-height: var(--app-height, 100dvh);

    ${FRAME_BREAKPOINT} {
      --frame-height: min(${FRAME_MAX_HEIGHT}, var(--app-height, 100dvh));
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 1rem = 10px */
  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
    letter-spacing: 0.02em;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
  }
`
