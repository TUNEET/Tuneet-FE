import type { ApiResponse } from '@/types/api'
import type { GenreResponse } from '@/types/genre'
import { cachedRequest } from '@/utils/requestCache'
import { instance } from './instance'

const GENRES_TTL_MS = 60 * 60 * 1000

export function getGenres() {
  return cachedRequest(
    'genres',
    async () => {
      const { data } = await instance.get<ApiResponse<GenreResponse[]>>('/api/v1/genres')
      return data.data
    },
    GENRES_TTL_MS,
  )
}
