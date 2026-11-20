import type { ApiResponse } from '@/types/api'
import type {
  FeedComment,
  FeedMessageResponse,
  NotificationListResponse,
  NotificationResponse,
  ReceivedNotification,
  ReplyTarget,
} from '@/types/notification'
import { getSentFeedMessages, toSearchedSong } from './feed'
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
    key: `comment-${senderNickname}-${createdAt}`,
    nickname: senderNickname,
    song: toSearchedSong(music),
    message: messageContent,
    liked: music.liked ?? false,
    createdAt,
  }))
}

const RECENT_MAX_PAGES = 5

/** 받은 답장 알림을 코멘트 모아보기·보낸 코멘트에 붙일 수 있는 모양으로 바꾼다 */
export const toFeedComment = ({
  id,
  senderNickname,
  song,
  message,
  liked,
  createdAt,
}: ReceivedNotification): FeedComment => ({
  key: `reply-${id}`,
  nickname: senderNickname,
  song,
  message,
  liked,
  createdAt,
})

/** 커서 목록을 최근 몇 페이지까지 넘겨 보며 모은다 */
async function collectPages<T extends { id: number }>(
  fetchPage: (cursor?: number) => Promise<{ items: T[]; hasNext: boolean }>,
) {
  const collected: T[] = []
  let cursor: number | undefined

  for (let page = 0; page < RECENT_MAX_PAGES; page += 1) {
    const { items, hasNext } = await fetchPage(cursor)
    collected.push(...items)
    if (!hasNext || items.length === 0) break
    cursor = items[items.length - 1].id
  }
  return collected
}

/**
 * 내 코멘트에 받은 답장. 답장 목록 API가 없어서 받은 알림에서 답장 알림만 모은다.
 * 각 답장의 feedMessageId로 어떤 코멘트에 단 답장인지 알 수 있다
 */
export async function getReceivedReplies() {
  const items = await collectPages(getReceivedFeedMessages)
  return items.filter((item) => item.kind === 'reply')
}

/** 최근에 보낸 코멘트. id가 코멘트 번호(feedMessageId)다 */
export function getRecentSentComments() {
  return collectPages(getSentFeedMessages)
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
