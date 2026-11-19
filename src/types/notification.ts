import type { FeedMusicResponse } from './feed'
import type { SearchedSong } from './music'

type BaseNotification = {
  id: number
  /** 코멘트가 달린 피드. 피드가 지워졌으면 null */
  feedId: number | null
  message: string
  song: SearchedSong
  liked: boolean
  createdAt: string
}

export type ReceivedNotification = BaseNotification & { senderNickname: string; isRead: boolean }

export type SentNotification = BaseNotification & { receiverNickname: string }

export type NotificationResponse = {
  notificationId: number
  type: 'FEED_MESSAGE' | 'LETTER'
  senderNickname: string
  feedId: number | null
  messageContent: string
  music: FeedMusicResponse
  isRead: boolean
  createdAt: string
}

export type NotificationListResponse = {
  notifications: NotificationResponse[]
  hasNext: boolean
}
