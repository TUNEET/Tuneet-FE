/** 편지에 담긴 노래 */
export type LetterMusic = {
  /** 노래 검색 결과 id */
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
}

/** 오늘 보낼 수 있는 편지 수 */
export type LetterQuota = {
  remaining: number
  limit: number
}

/** 답장 편지의 원래 편지 (내가 먼저 보낸 편지) */
export type ParentLetter = {
  letterId: number
  letterContent: string
  music: LetterMusic
  createdAt: string
}

/** 받은 편지 (목록·상세 공통) */
export type ReceivedLetter = {
  letterId: number
  senderId: number
  /** 탈퇴한 사람이면 '탈퇴한 사용자' */
  senderNickname: string
  music: LetterMusic
  letterContent: string
  isRead: boolean
  createdAt: string
  /** 이 편지가 내 편지에 온 답장인지 */
  isReply: boolean
  /** 내가 이 편지에 이미 답장했는지 (목록 조회에서는 null) */
  isReplied: boolean | null
  /** 답장이면 내가 먼저 보낸 원래 편지 */
  parentLetter: ParentLetter | null
}

/** 보낸 편지 */
export type SentLetter = {
  letterId: number
  receiverId: number
  /** 탈퇴한 사람이면 '탈퇴한 사용자' */
  receiverNickname: string
  music: LetterMusic
  letterContent: string
  isRandom: boolean
  isReply: boolean
  createdAt: string
}

/** 커서 기반 목록 응답 */
export type LetterPage<T> = {
  letters: T[]
  hasNext: boolean
}

export type LetterContentRequest = {
  musicId: string
  /** 최대 100자 */
  letterContent: string
}

/** 편지 보내기 응답 (지정·랜덤·답장 공통) */
export type LetterSendResponse = {
  letterId: number
  senderNickname: string
  receiverNickname: string
  music: LetterMusic
  letterContent: string
  createdAt: string
}

/** 편지함에서 보낸 편지 상세로 이동할 때 넘기는 state */
export type SentLetterLocationState = { letter?: SentLetter }
