import type { ApiResponse } from '@/types/api'
import type { ArtistSearchItem, MusicSearchItem, SearchPage } from '@/types/music'
import { instance } from './instance'

/** 제목이나 아티스트로 노래 검색 (page는 1부터) */
export async function searchMusics(q: string, page = 1, size = 5) {
  const { data } = await instance.get<ApiResponse<SearchPage<MusicSearchItem>>>('/api/v1/musics', {
    params: { q, page, size },
  })
  return data.data
}

/** 이름이나 별칭으로 아티스트 검색 (page는 1부터) */
export async function searchArtists(q: string, page = 1, size = 5) {
  const { data } = await instance.get<ApiResponse<SearchPage<ArtistSearchItem>>>(
    '/api/v1/artists',
    { params: { q, page, size } },
  )
  return data.data
}
