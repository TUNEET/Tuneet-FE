import type { ApiResponse } from '@/types/api'
import type {
  ExploreFeed,
  FeedContentRequest,
  FeedMusicResponse,
  FeedListResponse,
  FeedMessageRequest,
  FeedResponse,
  SentFeedMessageListResponse,
  SentFeedMessageResponse,
} from '@/types/feed'
import type { SentNotification } from '@/types/notification'
import { instance } from './instance'

const PAGE_SIZE = 20

export const toSearchedSong = ({ musicId, title, artist, musicPicture }: FeedMusicResponse) => ({
  musicId,
  title,
  artist,
  albumImageUrl: musicPicture ?? '',
})

const toExploreFeed = (
  { feedId, isMine, nickname, music, content, createdAt }: FeedResponse,
  mine = false,
): ExploreFeed => ({
  id: feedId,
  nickname,
  song: toSearchedSong(music),
  content,
  createdAt,
  isMine: isMine ?? mine,
  liked: music.liked ?? false,
})

export async function getFeeds(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<FeedListResponse>>('/api/v1/feeds', {
    params: { cursor, size },
  })
  return {
    items: data.data.feeds.map((feed) => toExploreFeed(feed)),
    hasNext: data.data.hasNext,
  }
}

export async function getFeed(feedId: number) {
  const { data } = await instance.get<ApiResponse<FeedResponse>>(`/api/v1/feeds/${feedId}`)
  return toExploreFeed(data.data)
}

/** 작성·수정 응답에는 isMine이 없어 내 글로 채운다 */
export async function createFeed(body: FeedContentRequest) {
  const { data } = await instance.post<ApiResponse<FeedResponse>>('/api/v1/feeds', body)
  return toExploreFeed(data.data, true)
}

export async function updateFeed(feedId: number, body: FeedContentRequest) {
  const { data } = await instance.put<ApiResponse<FeedResponse>>(`/api/v1/feeds/${feedId}`, body)
  return toExploreFeed(data.data, true)
}

export async function deleteFeed(feedId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/feeds/${feedId}`)
}

export async function sendFeedMessage(feedId: number, body: FeedMessageRequest) {
  await instance.post<ApiResponse<unknown>>(`/api/v1/feeds/${feedId}/messages`, body)
}

const toSentNotification = ({
  feedMessageId,
  receiverNickname,
  music,
  messageContent,
  createdAt,
}: SentFeedMessageResponse): SentNotification => ({
  id: feedMessageId,
  receiverNickname,
  message: messageContent,
  song: toSearchedSong(music),
  liked: music.liked ?? false,
  createdAt,
})

export async function getSentFeedMessages(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<SentFeedMessageListResponse>>(
    '/api/v1/feeds/messages/sent',
    { params: { cursor, size } },
  )
  return { items: data.data.messages.map(toSentNotification), hasNext: data.data.hasNext }
}

/** 내 보낸 목록에서만 지워지고 받는 사람의 알림은 남는다 */
export async function deleteAllSentFeedMessages() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/feeds/messages/sent')
}
