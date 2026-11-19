import type { ApiResponse } from '@/types/api'
import type {
  NotificationListResponse,
  NotificationResponse,
  ReceivedNotification,
  SentNotification,
} from '@/types/notification'
import { getSentFeedMessages, toSearchedSong } from './feed'
import { instance } from './instance'

const PAGE_SIZE = 20

const toReceivedNotification = ({
  notificationId,
  feedId,
  senderNickname,
  messageContent,
  music,
  isRead,
  createdAt,
}: NotificationResponse): ReceivedNotification => ({
  id: notificationId,
  feedId,
  senderNickname,
  message: messageContent,
  song: toSearchedSong(music),
  liked: music.liked ?? false,
  isRead,
  createdAt,
})

export async function getReceivedFeedMessages(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<NotificationListResponse>>(
    '/api/v1/notifications',
    { params: { cursor, size } },
  )
  return {
    items: data.data.notifications
      .filter(({ type }) => type === 'FEED_MESSAGE')
      .map(toReceivedNotification),
    hasNext: data.data.hasNext,
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

export type FeedCommentKind = 'received' | 'sent'

const FEED_COMMENT_MAX_PAGES = 5

/**
 * 한 피드에 오간 코멘트. 피드별로 주는 API가 없어서
 * 받은·보낸 코멘트 목록을 최근 몇 페이지까지 넘겨 보며 그 피드 것만 모은다
 */
export async function getFeedComments(feedId: number, kind: FeedCommentKind) {
  const fetchPage = kind === 'received' ? getReceivedFeedMessages : getSentFeedMessages
  const comments: (ReceivedNotification | SentNotification)[] = []
  let cursor: number | undefined

  for (let page = 0; page < FEED_COMMENT_MAX_PAGES; page += 1) {
    const { items, hasNext } = await fetchPage(cursor)
    comments.push(...items.filter((item) => item.feedId === feedId))
    if (!hasNext || items.length === 0) break
    cursor = items[items.length - 1].id
  }
  return comments
}
