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

export type ReceivedNotification = BaseNotification & {
  /** comment: 내 피드에 받은 코멘트, reply: 내 코멘트·답장에 받은 답장 */
  kind: 'comment' | 'reply'
  senderNickname: string
  isRead: boolean
  /** 이미 답장했으면 true. 답장 버튼을 숨긴다 */
  isReplied: boolean
  /** 코멘트에 답장할 때 쓰는 번호 */
  feedMessageId: number | null
  /** 받은 답장에 다시 답장할 때 쓰는 번호. 코멘트 알림이면 null */
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

/** 피드 하나에 달린 코멘트 (GET /feeds/{feed-id}/messages) */
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

/** 답장을 보낼 대상. 코멘트에 처음 답장할 때와 받은 답장에 다시 답장할 때 API가 다르다 */
export type ReplyTarget =
  { type: 'comment'; feedMessageId: number } | { type: 'reply'; replyId: number }
