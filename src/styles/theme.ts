export const theme = {
  colors: {
    /* 메인 */
    primary: '#CF8FB8', // 로고, 주요 버튼, 아이콘
    primaryLight: '#DDA6CA', // 장식, 보조 강조
    blueLight: '#9BB3DF', // 보조 아이콘, 테두리
    blue: '#5783D4', // 피드 정보, 강조 텍스트
    lavender: '#9E76D7', // 버튼, 아이콘, 테두리
    purple: '#8B57D4', // 추천 정보, 강조 텍스트

    /* 배경 */
    background: '#F2EBF2', // 화면 배경
    surfacePink: '#F6EBF2', // 카드, 보조 영역
    surfaceBlue: '#EDF1F8', // 피드 카드
    surfaceLavender: '#F2EDF8', // 추천 카드
    surfaceWhite: '#FAFAFA', // 밝은 요소
    border: '#E3D2DD', // 입력 영역, 테두리
    divider: '#EEEEEE', // 구분선

    /* 텍스트 */
    textHeading: '#392C37', // 주요 제목
    textPrimary: '#464B54', // 제목, 주요 텍스트
    textBody: '#646B76', // 본문
    textSecondary: '#8E9299', // 보조 정보
    textPlaceholder: '#A08E99', // 안내 문구, 플레이스홀더

    /* 상태 */
    danger: '#FF0044', // 삭제, 차단 등 위험 동작
  },
  fontFamily: {
    display: "'HiKR', 'Pretendard Variable', sans-serif",
  },
  fontSize: {
    xxs: '1rem',
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
