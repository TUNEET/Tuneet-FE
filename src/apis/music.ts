import type { ApiResponse } from '@/types/api'
import type { LikedMusicListResponse, LikedSong } from '@/types/like'
import type { ArtistSearchItem, MusicSearchItem, SearchPage } from '@/types/music'
import { toSearchedSong } from './feed'
import { instance } from './instance'

export async function likeMusic(musicId: string) {
  await instance.put<ApiResponse<unknown>>(`/api/v1/users/me/likes/musics/${musicId}`)
}

export async function unlikeMusic(musicId: string) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/users/me/likes/musics/${musicId}`)
}

export async function getLikedMusics(cursor?: number, size = 20) {
  const { data } = await instance.get<ApiResponse<LikedMusicListResponse>>(
    '/api/v1/users/me/likes/musics',
    { params: { cursor, size } },
  )
  return {
    items: data.data.musics.map(({ likeId, music }): LikedSong => ({
      id: likeId,
      song: toSearchedSong(music),
      liked: true,
    })),
    hasNext: data.data.hasNext,
  }
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
