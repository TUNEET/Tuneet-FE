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

export type SentNotification = BaseNotification & {
  /** comment: 남의 피드에 보낸 코멘트, reply: 받은 코멘트에 보낸 답장 */
  kind: 'comment' | 'reply'
  /** 코멘트와 답장은 번호 체계가 달라 목록 구분은 이 키로 한다 */
  key: string
  receiverNickname: string
}

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

/** 코멘트에 주고받은 답장 하나 */
export type FeedReplyResponse = {
  replyId: number
  senderNickname: string
  senderProfilePicture: string | null
  music: FeedMusicResponse | null
  replyContent: string
  createdAt: string
}

/** 피드 하나에 달린 코멘트 (GET /feeds/{feed-id}/messages). 주고받은 답장도 함께 온다 */
export type FeedMessageResponse = {
  feedMessageId: number
  senderNickname: string
  senderProfilePicture: string | null
  music: FeedMusicResponse | null
  messageContent: string
  createdAt: string
  replies: FeedReplyResponse[]
}

/** 받은 답장 상세 (GET /feeds/messages/replies/{reply-id}). 원래 코멘트와 주고받은 답장 전체 */
export type ReplyDetailResponse = {
  replyId: number
  feedId: number
  isReplied: boolean
  originalMessage: {
    feedMessageId: number
    senderNickname: string
    senderProfilePicture: string | null
    music: FeedMusicResponse | null
    messageContent: string
    createdAt: string
  }
  replies: FeedReplyResponse[]
}

export type FeedComment = {
  /** 목록 구분용 키 (comment-번호 / reply-번호) */
  key: string
  nickname: string
  song: SearchedSong
  message: string
  liked: boolean
  createdAt: string
  /** 이 코멘트에 주고받은 답장. 대댓글처럼 코멘트 아래에 붙여 보여 준다 */
  replies?: FeedComment[]
}

/** 답장은 받은 코멘트에 한 번만 보낼 수 있다. 받은 답장에 다시 답장할 수는 없다 */
export type ReplyTarget = { type: 'comment'; feedMessageId: number }
