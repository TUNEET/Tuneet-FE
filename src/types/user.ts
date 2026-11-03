import type { Song } from './song'

export type Profile = {
  nickname: string
  characterImageUrl: string
  song: Pick<Song, 'title' | 'artist'>
  genres: string[]
  artists: string[]
}

export type CommonTaste = {
  artists: { name: string; imageUrl: string }[]
  songs: Song[]
  genres: string[]
}

export type UserProfile = Profile & {
  id: number
  similarity: number
  distanceKm: number
  commonTaste: CommonTaste
}
