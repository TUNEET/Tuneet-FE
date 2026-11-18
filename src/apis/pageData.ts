import type { PageRequest } from '@/utils/prefetch'
import { getFeeds } from './feed'
import { getLetterQuota } from './letter'
import { getMyRooms } from './room'
import { getMyProfile } from './user'

export const HOME_FEED_COUNT = 2

export const PAGE_DATA = {
  homeFeeds: { key: 'homeFeeds', request: () => getFeeds(undefined, HOME_FEED_COUNT) },
  exploreFeeds: { key: 'exploreFeeds', request: () => getFeeds() },
  myRooms: { key: 'myRooms', request: getMyRooms },
  letterQuota: { key: 'letterQuota', request: getLetterQuota },
} satisfies Record<string, PageRequest<unknown>>

export const warmMyProfile = () => {
  getMyProfile().catch(() => {})
}
