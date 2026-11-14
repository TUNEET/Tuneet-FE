import type { RoomDetail } from '@/types/room'

const ALBUM = 'https://placehold.co/80x80'
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_ROOM_DETAIL: RoomDetail = {
  id: 1,
  name: '튠잇대학교',
  description: '튠잇대 모두 모여라~~',
  imageUrl: null,
  myRole: 'owner',
  inviteCode: 'aB3kP9xQ',
  hasPassword: false,
  memberCount: 6,
  members: [],
  feeds: [
    {
      id: 1,
      nickname: '커피 마시는 튜니',
      song: { title: 'Runaway', artist: 'RESCENE', albumImageUrl: ALBUM },
      content: '학교에서 이 노래 틀어줬으면..',
      createdAt: minutesAgo(8),
    },
    {
      id: 2,
      nickname: '산책하는 튜니',
      song: { title: 'not the same', artist: 'ROSÉ', albumImageUrl: ALBUM },
      content: '다들 시험 파이팅~',
      createdAt: minutesAgo(17),
    },
    {
      id: 3,
      nickname: '커피 마시는 튜니',
      song: { title: 'Runaway', artist: 'RESCENE', albumImageUrl: ALBUM },
      content: '학교에서 이 노래 틀어줬으면..',
      createdAt: minutesAgo(60),
    },
    {
      id: 4,
      nickname: '산책하는 튜니',
      song: { title: 'not the same', artist: 'ROSÉ', albumImageUrl: ALBUM },
      content: '다들 시험 파이팅~'.repeat(7),
      createdAt: minutesAgo(26 * 60),
    },
  ],
  playlist: Array.from({ length: 11 }, (_, index) => ({
    id: index + 1,
    title: index % 2 === 0 ? 'Pretty Girl' : 'Deja Vu',
    artist: 'RESCENE',
    albumImageUrl: ALBUM,
  })),
}
