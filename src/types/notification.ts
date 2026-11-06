import type { Song } from './song'

export type Notification = {
  id: number
  nickname: string
  message: string
  song: Song
  createdAt: string
}
