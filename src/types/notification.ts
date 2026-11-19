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
  nickname: string
  song: SearchedSong
  message: string
  liked: boolean
  createdAt: string
}

export type ReplyTarget =
  { type: 'comment'; feedMessageId: number } | { type: 'reply'; replyId: number }
