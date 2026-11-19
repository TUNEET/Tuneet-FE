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

export type LikedSong = {
  id: number
  song: SearchedSong
  liked: boolean
}
