import type { ApiResponse } from '@/types/api'
import type {
  NotificationListResponse,
  NotificationResponse,
  ReceivedNotification,
} from '@/types/notification'
import { toSearchedSong } from './feed'
import { instance } from './instance'

const PAGE_SIZE = 20

const toReceivedNotification = ({
  notificationId,
  senderNickname,
  messageContent,
  music,
  createdAt,
}: NotificationResponse): ReceivedNotification => ({
  id: notificationId,
  senderNickname,
  message: messageContent,
  song: toSearchedSong(music),
  liked: music.liked ?? false,
  createdAt,
})

/** 받은 코멘트 탭이라 피드 메시지 알림만 보여준다 */
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
