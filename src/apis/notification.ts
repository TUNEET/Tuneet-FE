import type { ApiResponse } from '@/types/api'
import type {
  FeedComment,
  FeedMessageResponse,
  NotificationListResponse,
  NotificationResponse,
  ReceivedNotification,
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

export async function getFeedComments(feedId: number): Promise<FeedComment[]> {
  const { data } = await instance.get<ApiResponse<{ messages: FeedMessageResponse[] }>>(
    `/api/v1/feeds/${feedId}/messages`,
  )
  return data.data.messages.map(({ senderNickname, music, messageContent, createdAt }) => ({
    nickname: senderNickname,
    song: toSearchedSong(music),
    message: messageContent,
    liked: music.liked ?? false,
    createdAt,
  }))
}

export async function sendReply(
  target: ReplyTarget,
  body: { musicId: string; replyContent: string },
) {
  const url =
    target.type === 'comment'
      ? `/api/v1/feeds/messages/${target.feedMessageId}/replies`
      : `/api/v1/feeds/messages/replies/${target.replyId}/replies`
  await instance.post<ApiResponse<unknown>>(url, body)
}
