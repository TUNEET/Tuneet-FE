export const theme = {
  colors: {
    primary: '#3b5bdb',
    black: '#111111',
    white: '#ffffff',
    gray100: '#f5f5f5',
    gray300: '#d4d4d4',
    gray500: '#737373',
    gray700: '#404040',
    error: '#e03131',
  },
  fontSize: {
    xs: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '2rem',
    xl: '2.4rem',
  },
  breakpoints: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (max-width: 1023px)',
  },
} as const

export type Theme = typeof theme
