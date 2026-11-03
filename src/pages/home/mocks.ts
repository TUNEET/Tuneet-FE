import characterProfile from '@/assets/images/character-profile.png'
import type { FeedCardProps } from '@/components/common/FeedCard/FeedCard'
import type { TasteMatchCardProps } from '@/components/common/TasteMatchCard/TasteMatchCard'

export const MOCK_PROFILE = {
  nickname: '튜니',
  characterImage: characterProfile,
  song: { title: 'Pretty Girl', artist: 'RESCENE' },
  genres: ['K-POP', 'POP', 'HIP-HOP'],
  artists: ['RESCENE', 'ROSÉ', 'Travis Scott'],
}

export const MOCK_FEEDS: (FeedCardProps & { id: number })[] = [
  {
    id: 1,
    nickname: '노래하는 튜니',
    timeAgo: '3분 전',
    songTitle: 'not the same',
    artist: 'ROSÉ',
    albumImage: 'https://placehold.co/80x80',
    comment: '요즘 출퇴근길마다 무한 반복 중..',
  },
  {
    id: 2,
    nickname: '기타치는 튜니',
    timeAgo: '12분 전',
    songTitle: 'SICKO MODE',
    artist: 'Travis Scott',
    albumImage: 'https://placehold.co/80x80',
    comment: '졸릴 땐 이게 최고!',
  },
]

export const MOCK_TASTE_MATCHES: (TasteMatchCardProps & { id: number })[] = [
  {
    id: 1,
    nickname: '커피 마시는 튜니',
    similarity: 92,
    distance: '1.2km',
    image: 'https://placehold.co/80x80',
    title: '[RESCENE]를 좋아해요',
    description: '나와 같은 아티스트 취향',
  },
  {
    id: 2,
    nickname: '산책하는 튜니',
    similarity: 87,
    distance: '3.5km',
    image: 'https://placehold.co/80x80',
    title: '[3am]을 좋아해요',
    description: '나와 같은 노래 취향',
    isSong: true,
  },
]
