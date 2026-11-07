import type { CreatedRoom, CreateRoomRequest, PlaylistSong, RoomDetail } from '@/types/room'

const ALBUM = 'https://placehold.co/80x80'
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_ROOM_DETAIL: RoomDetail = {
  id: 1,
  name: '튠잇대학교',
  description: '튠잇대 모두 모여라~~',
  imageUrl: '',
  myRole: 'owner',
  members: [
    {
      id: 1,
      nickname: '튜니',
      role: 'owner',
      characterColorId: 1,
      song: { title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: ALBUM },
      similarity: 92,
      distanceKm: 1.2,
    },
    {
      id: 2,
      nickname: '원영',
      role: 'member',
      characterColorId: 2,
      song: { title: 'Looks Can Kill', artist: 'IVE', albumImageUrl: ALBUM },
      similarity: 81,
      distanceKm: 1.7,
    },
    {
      id: 3,
      nickname: '원이',
      role: 'member',
      characterColorId: 3,
      song: { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: ALBUM },
      similarity: 80,
      distanceKm: 1.9,
    },
    {
      id: 4,
      nickname: '리브',
      role: 'member',
      characterColorId: 4,
      song: { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: ALBUM },
      similarity: 72,
      distanceKm: 2.0,
    },
    {
      id: 5,
      nickname: '나미',
      role: 'member',
      characterColorId: 5,
      song: { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: ALBUM },
      similarity: 62,
      distanceKm: 2.8,
    },
    {
      id: 6,
      nickname: '사자',
      role: 'member',
      characterColorId: 6,
      song: { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: ALBUM },
      similarity: 51,
      distanceKm: 4.8,
    },
  ],
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

const MOCK_SEARCHABLE_SONGS: PlaylistSong[] = [
  { id: 101, title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: ALBUM },
  { id: 102, title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: ALBUM },
  { id: 103, title: 'LOVE ATTACK', artist: 'RESCENE', albumImageUrl: ALBUM },
  { id: 104, title: 'Glow Up', artist: 'RESCENE', albumImageUrl: ALBUM },
  { id: 105, title: 'Yoyo', artist: 'RESCENE', albumImageUrl: ALBUM },
  { id: 106, title: 'not the same', artist: 'ROSÉ', albumImageUrl: ALBUM },
  { id: 107, title: 'Looks Can Kill', artist: 'IVE', albumImageUrl: ALBUM },
  {
    id: 108,
    title: '어떻게 이별까지 사랑하겠어, 널 사랑하는 거지',
    artist: '악동뮤지션',
    albumImageUrl: ALBUM,
  },
]

const MOCK_EXTRA_SEARCHABLE_SONGS: PlaylistSong[] = Array.from({ length: 8 }, (_, index) => ({
  id: 109 + index,
  title: `Track ${index + 1}`,
  artist: 'RESCENE',
  albumImageUrl: ALBUM,
}))

export async function mockSearchPlaylistSongs(query: string) {
  const keyword = query.trim().toLowerCase()
  return [...MOCK_SEARCHABLE_SONGS, ...MOCK_EXTRA_SEARCHABLE_SONGS].filter(({ title, artist }) =>
    `${title} ${artist}`.toLowerCase().includes(keyword),
  )
}

export async function mockCreateRoom(request: CreateRoomRequest): Promise<CreatedRoom> {
  const roomCode = Math.random().toString(36).slice(2, 8)

  return {
    id: Date.now(),
    name: request.name,
    description: request.description,
    imageUrl: '',
    inviteUrl: `https://tuneet.com/invite/${roomCode}`,
  }
}

const MOCK_ROOM_PASSWORD = '1234'

export async function mockGetInvitedRoom(inviteCode: string) {
  return { roomId: MOCK_ROOM_DETAIL.id, inviteCode, hasPassword: true }
}

export async function mockJoinRoom(_inviteCode: string, password?: string) {
  return password === undefined || password === MOCK_ROOM_PASSWORD
}
