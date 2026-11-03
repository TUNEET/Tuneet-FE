import type { Song } from './song'

export type Profile = {
  nickname: string
  characterImageUrl: string
  song: Pick<Song, 'title' | 'artist'>
  genres: string[]
  artists: string[]
}
