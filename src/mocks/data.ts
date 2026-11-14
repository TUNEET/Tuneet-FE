import characterProfile from '@/assets/images/character-profile.png'
import type { Feed } from '@/types/feed'
import type { TasteMatch } from '@/types/match'
import type { ReceivedNotification, SentNotification } from '@/types/notification'
import type { Room } from '@/types/room'
import type { Song } from '@/types/song'
import type { Profile, UserProfile } from '@/types/user'

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_PROFILE: Profile = {
  nickname: '튜니',
  characterImageUrl: characterProfile,
  song: { title: 'Pretty Girl', artist: 'RESCENE' },
  genres: ['K-POP', 'POP', 'HIP-HOP'],
  artists: ['RESCENE', 'ROSÉ', 'Travis Scott'],
}

export const MOCK_FEEDS: Feed[] = [
  {
    id: 1,
    nickname: '노래하는 튜니',
    song: { title: 'not the same', artist: 'ROSÉ', albumImageUrl: 'https://placehold.co/80x80' },
    content: '요즘 출퇴근길마다 무한 반복 중..',
    createdAt: minutesAgo(3),
  },
  {
    id: 2,
    nickname: '기타치는 튜니',
    song: {
      title: 'SICKO MODE',
      artist: 'Travis Scott',
      albumImageUrl: 'https://placehold.co/80x80',
    },
    content: '졸릴 땐 이게 최고!',
    createdAt: minutesAgo(12),
  },
]

export const MOCK_EXPLORE_FEEDS: Feed[] = [
  ...MOCK_FEEDS,
  { ...MOCK_FEEDS[0], id: 3, createdAt: minutesAgo(20) },
  { ...MOCK_FEEDS[1], id: 4, createdAt: minutesAgo(45) },
  { ...MOCK_FEEDS[0], id: 5, createdAt: minutesAgo(60) },
  { ...MOCK_FEEDS[1], id: 6, createdAt: minutesAgo(120) },
]

export const MOCK_BLOCKED_USERS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  nickname: '산책하는 튜니',
  blockedDate: '2026. 11. 21',
}))

export const MOCK_WRITE_SONG: Song = {
  title: 'Pretty Girl',
  artist: 'RESCENE',
  albumImageUrl: 'https://placehold.co/24x24',
}

export const MOCK_NOTIFICATIONS: ReceivedNotification[] = [
  {
    id: 1,
    senderNickname: '배고픈 튜니',
    message: '이 노래도 좋아하실 것 같아요!',
    song: { title: 'REBEL HEART', artist: 'IVE', albumImageUrl: 'https://placehold.co/80x80' },
    createdAt: minutesAgo(1),
  },
  {
    id: 2,
    senderNickname: '노래하는 튜니',
    message: '가사가 너무 좋아서 들어봐주세요.',
    song: { title: 'number one girl', artist: 'ROSÉ', albumImageUrl: 'https://placehold.co/80x80' },
    createdAt: minutesAgo(26),
  },
  {
    id: 3,
    senderNickname: '졸린 튜니',
    message: '오늘 날씨랑 너무 잘 어울리는 것 같아',
    song: { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/80x80' },
    createdAt: minutesAgo(60),
  },
]

/** 실시간 알림 연동 전, 탐색 피드에 띄울 새 코멘트 알림 */
export const MOCK_INCOMING_COMMENT = {
  senderNickname: '노래하는 튜니',
  createdAt: minutesAgo(0),
}

export const MOCK_SENT_NOTIFICATIONS: SentNotification[] = [
  {
    id: 101,
    receiverNickname: '산책하는 튜니',
    message: '이 노래 들으면서 걸어보세요!',
    song: { title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/80x80' },
    createdAt: minutesAgo(5),
  },
  {
    id: 102,
    receiverNickname: '커피 마시는 튜니',
    message: '잔잔해서 작업할 때 듣기 좋아요.',
    song: { title: 'not the same', artist: 'ROSÉ', albumImageUrl: 'https://placehold.co/80x80' },
    createdAt: minutesAgo(90),
  },
]

export const MOCK_TASTE_MATCHES: TasteMatch[] = [
  {
    id: 1,
    nickname: '커피 마시는 튜니',
    similarity: 92,
    distanceKm: 1.2,
    matchType: 'artist',
    name: 'RESCENE',
    imageUrl: 'https://placehold.co/80x80',
  },
  {
    id: 2,
    nickname: '산책하는 튜니',
    similarity: 87,
    distanceKm: 3.5,
    matchType: 'song',
    name: '3am',
    imageUrl: 'https://placehold.co/80x80',
  },
]

export const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    name: '튠잇대학교',
    description: '튠잇대 모두 모여라~~',
    imageUrl: 'https://placehold.co/80x80',
  },
  {
    id: 2,
    name: 'ZZZ...',
    description: '자장가 들으면서 자는 방',
    imageUrl: 'https://placehold.co/80x80',
  },
]

export const MOCK_RECOMMENDED_USERS: TasteMatch[] = [
  ...MOCK_TASTE_MATCHES,
  { ...MOCK_TASTE_MATCHES[0], id: 3 },
  { ...MOCK_TASTE_MATCHES[1], id: 4 },
  { ...MOCK_TASTE_MATCHES[0], id: 5 },
]

export const MOCK_USER_PROFILE: UserProfile = {
  id: 2,
  nickname: '산책하는 튜니',
  characterImageUrl: characterProfile,
  song: { title: 'Runaway', artist: 'RESCENE' },
  genres: ['K-POP', 'POP', 'HIP-HOP'],
  artists: ['RESCENE', 'IVE', 'Crush'],
  similarity: 92,
  distanceKm: 1.2,
  commonTaste: {
    artists: [{ name: 'RESCENE', imageUrl: 'https://placehold.co/24x24' }],
    songs: [
      { title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/24x24' },
    ],
    genres: ['K-POP', 'POP', 'HIP-HOP'],
  },
}
