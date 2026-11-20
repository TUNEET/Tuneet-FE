import type { ApiResponse } from '@/types/api'
import type { FeedMusicResponse } from '@/types/feed'
import type {
  FeedComment,
  FeedMessageResponse,
  FeedReplyResponse,
  NotificationListResponse,
  NotificationResponse,
  ReceivedNotification,
  ReplyDetailResponse,
  ReplyTarget,
} from '@/types/notification'
import { toSearchedSong } from './feed'
import { instance } from './instance'

const PAGE_SIZE = 20

const toReceivedNotification = ({
  notificationId,
  type,
  feedId,
  feedMessageId,
  replyId,
  senderNickname,
  messageContent,
  music,
  isRead,
  isReplied,
  createdAt,
}: NotificationResponse): ReceivedNotification => ({
  id: notificationId,
  kind: type === 'FEED_MESSAGE_REPLY' ? 'reply' : 'comment',
  feedId,
  feedMessageId,
  replyId,
  senderNickname,
  message: messageContent,
  song: toSearchedSong(music),
  liked: music.liked ?? false,
  isRead,
  isReplied: isReplied ?? false,
  createdAt,
})

export async function getReceivedFeedMessages(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<NotificationListResponse>>(
    '/api/v1/notifications',
    { params: { cursor, size } },
  )
  const { notifications, hasNext } = data.data
  return {
    items: notifications
      .filter(({ type }) => type === 'FEED_MESSAGE' || type === 'FEED_MESSAGE_REPLY')
      .map(toReceivedNotification),
    hasNext,
    nextCursor: notifications.at(-1)?.notificationId,
  }
}

export async function deleteAllNotifications() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/notifications')
}

export async function registerFcmToken(token: string) {
  await instance.post<ApiResponse<unknown>>('/api/v1/notifications/tokens', { token })
}

export async function deleteFcmToken(token: string) {
  await instance.delete<ApiResponse<unknown>>('/api/v1/notifications/tokens', { data: { token } })
}

// 노래가 지워졌으면 music이 null로 와서 빈 노래로 채운다
const toSongOrEmpty = (music: FeedMusicResponse | null) =>
  music ? toSearchedSong(music) : { musicId: '', title: '', artist: '', albumImageUrl: '' }

const toFeedReply = (reply: FeedReplyResponse): FeedComment => ({
  key: `reply-${reply.replyId}`,
  nickname: reply.senderNickname,
  song: toSongOrEmpty(reply.music),
  message: reply.replyContent,
  liked: reply.music?.liked ?? false,
  createdAt: reply.createdAt,
})

/** 피드 하나에 달린 코멘트 전체(최신순)와 각 코멘트에 주고받은 답장(오래된 순) */
export async function getFeedComments(feedId: number): Promise<FeedComment[]> {
  const { data } = await instance.get<ApiResponse<{ messages: FeedMessageResponse[] }>>(
    `/api/v1/feeds/${feedId}/messages`,
  )
  return data.data.messages.map((message) => ({
    key: `comment-${message.feedMessageId}`,
    nickname: message.senderNickname,
    song: toSongOrEmpty(message.music),
    message: message.messageContent,
    liked: message.music?.liked ?? false,
    createdAt: message.createdAt,
    replies: message.replies.map(toFeedReply),
  }))
}

/** 받은 답장 알림을 눌렀을 때: 원래 코멘트 하나와 그 코멘트에 주고받은 답장 전체 */
export async function getReplyThread(replyId: number): Promise<FeedComment[]> {
  const { data } = await instance.get<ApiResponse<ReplyDetailResponse>>(
    `/api/v1/feeds/messages/replies/${replyId}`,
  )
  const { originalMessage, replies } = data.data
  return [
    {
      key: `comment-${originalMessage.feedMessageId}`,
      nickname: originalMessage.senderNickname,
      song: toSongOrEmpty(originalMessage.music),
      message: originalMessage.messageContent,
      liked: originalMessage.music?.liked ?? false,
      createdAt: originalMessage.createdAt,
      replies: replies.map(toFeedReply),
    },
  ]
}

export async function sendReply(
  target: ReplyTarget,
  body: { musicId: string; replyContent: string },
) {
  // 답장은 받은 코멘트에 한 번만 보낸다 (답장에 다시 답장하는 API는 쓰지 않는다)
  await instance.post<ApiResponse<unknown>>(
    `/api/v1/feeds/messages/${target.feedMessageId}/replies`,
    body,
  )
}
