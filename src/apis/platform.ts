import type { ApiResponse } from '@/types/api'
import type { PlatformSyncResponse } from '@/types/platform'
import { instance } from './instance'

const YOUTUBE_MUSIC_PATH = '/api/v1/users/me/platforms/youtube-music'

export async function getYoutubeMusicAuthorizeUrl() {
  const { data } = await instance.get<ApiResponse<{ url: string }>>(
    `${YOUTUBE_MUSIC_PATH}/authorize-url`,
  )
  return data.data.url
}

export async function linkYoutubeMusic(body: { code: string; state: string }) {
  await instance.post<ApiResponse<null>>(YOUTUBE_MUSIC_PATH, body)
}

export async function syncYoutubeMusic() {
  const { data } = await instance.post<ApiResponse<PlatformSyncResponse>>(
    `${YOUTUBE_MUSIC_PATH}/sync`,
  )
  return data.data
}

export async function unlinkYoutubeMusic() {
  await instance.delete<ApiResponse<null>>(YOUTUBE_MUSIC_PATH)
}
