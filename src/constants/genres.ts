import type { GenreResponse } from '@/types/genre'

export const GENRE_ROW_SIZE = 4

export const DEFAULT_GENRES: GenreResponse[] = [
  { genreId: 1, genreName: 'K_POP', displayName: 'K-POP' },
  { genreId: 2, genreName: 'POP', displayName: 'POP' },
  { genreId: 3, genreName: 'HIP_HOP', displayName: 'HIP-HOP' },
  { genreId: 4, genreName: 'R_AND_B_SOUL', displayName: 'R&B / SOUL' },
  { genreId: 5, genreName: 'BALLAD', displayName: 'BALLAD' },
  { genreId: 6, genreName: 'INDIE', displayName: 'INDIE' },
  { genreId: 7, genreName: 'J_POP', displayName: 'J-POP' },
  { genreId: 8, genreName: 'JAZZ', displayName: 'JAZZ' },
  { genreId: 9, genreName: 'EDM_ELECTRONIC', displayName: 'EDM / ELECTRONIC' },
  { genreId: 10, genreName: 'ROCK', displayName: 'ROCK' },
  { genreId: 11, genreName: 'OST', displayName: 'OST' },
]
