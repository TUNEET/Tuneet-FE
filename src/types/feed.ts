import type { Song } from './song'

export type Feed = {
  id: number
  nickname: string
  song: Song
  content: string
  createdAt: string
}
