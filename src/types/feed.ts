import type { SearchedSong } from './music'
import type { Song } from './song'

export type Feed = {
  id: number
  nickname: string
  song: Song
  content: string
  createdAt: string
}

export type ExploreFeed = Feed & {
  song: SearchedSong
  userId: number | null
  isMine: boolean
  liked: boolean
}

export type FeedMusicResponse = {
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
  liked?: boolean | null
}

export type FeedResponse = {
  feedId: number
  userId?: number | null
  isMine?: boolean
  nickname: string
  profilePicture?: string | null
  music: FeedMusicResponse
  content: string
  createdAt: string
}

export type FeedListResponse = {
  feeds: FeedResponse[]
  hasNext: boolean
}

export type FeedContentRequest = {
  musicId: string
  content: string
}

export type SentFeedMessageResponse = {
  /** COMMENT: 내가 보낸 코멘트, REPLY: 내가 보낸 답장 */
  type: 'COMMENT' | 'REPLY'
  /** 답장이면 답장이 이어진 처음 코멘트 번호 */
  feedMessageId: number
  /** 답장 번호. 코멘트면 null */
  replyId: number | null
  feedId: number
  receiverId: number
  receiverNickname: string
  music: FeedMusicResponse
  messageContent: string
  createdAt: string
}

export type SentFeedMessageListResponse = {
  messages: SentFeedMessageResponse[]
  hasNext: boolean
  /** 다음 페이지를 요청할 때 cursor로 그대로 넘기는 값. 마지막이면 null */
  nextCursor: string | null
}

export type FeedMessageRequest = {
  musicId: string
  messageContent: string
}
