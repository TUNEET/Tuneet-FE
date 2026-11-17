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
  feedMessageId: number
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
}

export type FeedMessageRequest = {
  musicId: string
  messageContent: string
}
