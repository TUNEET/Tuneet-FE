import type { ApiResponse } from '@/types/api'
import type { ArtistSearchItem, MusicSearchItem, SearchPage } from '@/types/music'
import { instance } from './instance'

export async function searchMusics(q: string, page = 1, size = 5) {
  const { data } = await instance.get<ApiResponse<SearchPage<MusicSearchItem>>>('/api/v1/musics', {
    params: { q, page, size },
  })
  return data.data
}

export async function searchArtists(q: string, page = 1, size = 5) {
  const { data } = await instance.get<ApiResponse<SearchPage<ArtistSearchItem>>>(
    '/api/v1/artists',
    { params: { q, page, size } },
  )
  return data.data
}
