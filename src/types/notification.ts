import type { Song } from './song'

type BaseNotification = {
  id: number
  message: string
  song: Song
  createdAt: string
}

/** 받은 코멘트: 나에게 노래를 보낸 사람 */
export type ReceivedNotification = BaseNotification & { senderNickname: string }

/** 보낸 코멘트: 내가 노래를 보낸 사람 */
export type SentNotification = BaseNotification & { receiverNickname: string }
