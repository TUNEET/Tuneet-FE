import type { FeedMusicResponse } from './feed'
import type { SearchedSong } from './music'

type BaseNotification = {
  id: number
  feedId: number | null
  message: string
  song: SearchedSong
  liked: boolean
  createdAt: string
}

export type ReceivedNotification = BaseNotification & {
  kind: 'comment' | 'reply'
  senderNickname: string
  isRead: boolean
  isReplied: boolean
  feedMessageId: number | null
  replyId: number | null
}

export type SentNotification = BaseNotification & { receiverNickname: string }

export type NotificationResponse = {
  notificationId: number
  type: 'FEED_MESSAGE' | 'LETTER' | 'FEED_MESSAGE_REPLY'
  senderNickname: string
  feedId: number | null
  feedMessageId: number | null
  replyId: number | null
  messageContent: string
  music: FeedMusicResponse
  isRead: boolean
  isReplied: boolean | null
  createdAt: string
}

export type NotificationListResponse = {
  notifications: NotificationResponse[]
  hasNext: boolean
}

export type FeedMessageResponse = {
  senderNickname: string
  senderProfilePicture: string | null
  music: FeedMusicResponse
  messageContent: string
  createdAt: string
}

export type FeedComment = {
  /** 목록 구분용 키. 코멘트는 번호가 없어 보낸 사람·시간으로 만든다 */
  key: string
  nickname: string
  song: SearchedSong
  message: string
  liked: boolean
  createdAt: string
  /** 이 코멘트에 받은 답장. 대댓글처럼 아래에 붙여 보여 준다 */
  replies?: FeedComment[]
}

/** 답장은 받은 코멘트에 한 번만 보낼 수 있다. 받은 답장에 다시 답장할 수는 없다 */
export type ReplyTarget = { type: 'comment'; feedMessageId: number }
