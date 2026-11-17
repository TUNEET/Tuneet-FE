import type { ReceivedNotification } from '@/types/notification'

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_BLOCKED_USERS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  nickname: '산책하는 튜니',
  blockedDate: '2026. 11. 21',
}))

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

export const MOCK_INCOMING_COMMENT = {
  senderNickname: '노래하는 튜니',
  createdAt: minutesAgo(0),
}
