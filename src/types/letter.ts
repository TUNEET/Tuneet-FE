import type { Song } from './song'

export type LetterQuota = {
  remaining: number
  total: number
}

export type SendLetterRequest = {
  /** 없으면 받는 사람을 정하지 않은 익명 편지 */
  recipientId?: number
  content: string
  song: Song
}

export type ReceivedLetter = {
  id: number
  senderId: number
  senderNickname: string
  content: string
  song: Song
  sentAt: string
}
