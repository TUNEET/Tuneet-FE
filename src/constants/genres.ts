export const GENRE_ROWS = [
  ['K-POP', 'POP', 'HIP-HOP', 'R&B / SOUL'],
  ['BALLAD', 'INDIE', 'J-POP', 'JAZZ'],
  ['EDM / ELECTRONIC', 'ROCK', 'OST'],
]

/** 화면 장르 이름 → 서버 장르 값 (GET /api/v1/genres 의 displayName → genreName) */
export const GENRE_NAMES: Record<string, string> = {
  'K-POP': 'K_POP',
  POP: 'POP',
  'HIP-HOP': 'HIP_HOP',
  'R&B / SOUL': 'R_AND_B_SOUL',
  BALLAD: 'BALLAD',
  INDIE: 'INDIE',
  'J-POP': 'J_POP',
  JAZZ: 'JAZZ',
  'EDM / ELECTRONIC': 'EDM_ELECTRONIC',
  ROCK: 'ROCK',
  OST: 'OST',
}
