import type { Song } from './song'

export type LetterQuota = {
  remaining: number
  total: number
}

export type SendLetterRequest = {
  recipientId: number
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
