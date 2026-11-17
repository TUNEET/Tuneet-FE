import type { ApiResponse } from '@/types/api'
import type { ArtistSearchItem, MusicSearchItem, SearchPage } from '@/types/music'
import { instance } from './instance'

/** 곡 단위 좋아요: 같은 곡의 다른 음원 좋아요도 함께 반영된다 */
export async function likeMusic(musicId: string) {
  await instance.put<ApiResponse<unknown>>(`/api/v1/users/me/likes/musics/${musicId}`)
}

export async function unlikeMusic(musicId: string) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/users/me/likes/musics/${musicId}`)
}

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
