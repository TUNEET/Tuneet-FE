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
  /** 내가 이 편지에 보낸 답장 (답장하지 않았으면 null) */
  reply: LetterReply | null
}

export type LetterReply = {
  content: string
  song: Song
  sentAt: string
}

export type SentLetter = {
  id: number
  recipientId: number
  recipientNickname: string
  content: string
  song: Song
  sentAt: string
}
