import type { ApiResponse } from '@/types/api'
import type { GenreResponse } from '@/types/genre'
import { cachedRequest } from '@/utils/requestCache'
import { instance } from './instance'

const GENRES_TTL_MS = 60 * 60 * 1000

/** 선택할 수 있는 장르를 화면 순서대로 준다. 자주 바뀌지 않아 한 시간 동안 같이 쓴다 */
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
