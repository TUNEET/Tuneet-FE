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
  { feedId, userId, isMine, nickname, music, content, createdAt }: FeedResponse,
  mine = false,
): ExploreFeed => ({
  id: feedId,
  userId: userId ?? null,
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
  type,
  feedMessageId,
  replyId,
  feedId,
  receiverNickname,
  music,
  messageContent,
  createdAt,
}: SentFeedMessageResponse): SentNotification => {
  const isReply = type === 'REPLY' && replyId !== null
  return {
    // 코멘트와 답장은 번호 체계가 달라 목록 구분은 key로 한다
    id: isReply ? replyId : feedMessageId,
    key: isReply ? `reply-${replyId}` : `comment-${feedMessageId}`,
    kind: isReply ? 'reply' : 'comment',
    feedId,
    receiverNickname,
    message: messageContent,
    song: toSearchedSong(music),
    liked: music.liked ?? false,
    createdAt,
  }
}

/** 보낸 코멘트와 답장 (최신순). 다음 페이지는 서버가 주는 nextCursor로 이어 받는다 */
export async function getSentFeedMessages(cursor?: string, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<SentFeedMessageListResponse>>(
    '/api/v1/feeds/messages/sent',
    { params: { cursor, size } },
  )
  return {
    items: data.data.messages.map(toSentNotification),
    hasNext: data.data.hasNext,
    nextCursor: data.data.nextCursor ?? undefined,
  }
}

export async function deleteAllSentFeedMessages() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/feeds/messages/sent')
}
