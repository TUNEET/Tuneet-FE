import { createGlobalStyle } from 'styled-components'
import passwordMaskFont from '@/assets/fonts/password-mask.woff'
import { BOTTOM_NAV_HEIGHT, FRAME_BREAKPOINT, FRAME_MAX_HEIGHT, HEADER_HEIGHT } from './layout'

export const GlobalStyle = createGlobalStyle`
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

  /* 입력창 기본 포커스 테두리를 없앤다. :where로 우선순위를 0으로 둬서
     에러 테두리처럼 컴포넌트가 직접 넣은 outline은 그대로 보인다 */
  :where(input:focus, textarea:focus, select:focus) {
    outline: none;
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
