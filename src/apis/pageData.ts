import type { PageRequest } from '@/utils/prefetch'
import { getFeeds } from './feed'
import { getLetterQuota } from './letter'
import { getMyRooms } from './room'
import { getMyProfile } from './user'

export const HOME_FEED_COUNT = 2

// 페이지에 들어갈 때 페이지 코드와 함께 미리 받는 데이터 (key가 같아야 화면에서 이어받는다)
export const PAGE_DATA = {
  homeFeeds: { key: 'homeFeeds', request: () => getFeeds(undefined, HOME_FEED_COUNT) },
  exploreFeeds: { key: 'exploreFeeds', request: () => getFeeds() },
  myRooms: { key: 'myRooms', request: getMyRooms },
  letterQuota: { key: 'letterQuota', request: getLetterQuota },
} satisfies Record<string, PageRequest<unknown>>

// 내 정보는 따로 저장해 두고 같이 쓰므로 미리 불러 두기만 한다
export const warmMyProfile = () => {
  getMyProfile().catch(() => {})
}
