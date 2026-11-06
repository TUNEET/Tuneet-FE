import characterProfile from '@/assets/images/character-profile.png'
import type { Feed } from '@/types/feed'
import type { LetterQuota } from '@/types/letter'
import type { TasteMatch } from '@/types/match'
import type { Room } from '@/types/room'
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

export const MOCK_LETTER_QUOTA: LetterQuota = { remaining: 3, total: 5 }

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
