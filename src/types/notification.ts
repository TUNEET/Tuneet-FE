import type { Song } from './song'

type BaseNotification = {
  id: number
  message: string
  song: Song
  createdAt: string
}

export type ReceivedNotification = BaseNotification & { senderNickname: string }

export type SentNotification = BaseNotification & { receiverNickname: string }
