import type { FeedMusicResponse } from './feed'
import type { SearchedSong } from './music'

export type LikedMusicResponse = {
  likeId: number
  music: FeedMusicResponse
  source: 'IN_APP' | 'YOUTUBE_MUSIC'
  likedAt: string
}

export type LikedMusicListResponse = {
  musics: LikedMusicResponse[]
  hasNext: boolean
}

/** liked: 목록 화면에서 하트를 꺼도 바로 지우지 않고 다시 누를 수 있게 상태로 둔다 */
export type LikedSong = {
  id: number
  song: SearchedSong
  liked: boolean
}
