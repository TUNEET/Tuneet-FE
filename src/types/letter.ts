export type LetterMusic = {
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
}

export type LetterQuota = {
  remaining: number
  limit: number
}

export type ParentLetter = {
  letterId: number
  letterContent: string
  music: LetterMusic
  createdAt: string
}

export type ReceivedLetter = {
  letterId: number
  senderId: number
  senderNickname: string
  music: LetterMusic
  letterContent: string
  isRead: boolean
  createdAt: string
  isReply: boolean
  isReplied: boolean | null
  parentLetter: ParentLetter | null
}

export type SentLetter = {
  letterId: number
  receiverId: number
  receiverNickname: string
  music: LetterMusic
  letterContent: string
  isRandom: boolean
  isReply: boolean
  createdAt: string
}

export type LetterPage<T> = {
  letters: T[]
  hasNext: boolean
}

export type LetterContentRequest = {
  musicId: string
  letterContent: string
}

export type LetterSendResponse = {
  letterId: number
  senderNickname: string
  receiverNickname: string
  music: LetterMusic
  letterContent: string
  createdAt: string
}

export type SentLetterLocationState = { letter?: SentLetter }
