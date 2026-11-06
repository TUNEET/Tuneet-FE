import { MOCK_USER_PROFILE } from '@/mocks/data'
import { MOCK_ROOM_DETAIL } from '@/mocks/room'
import type { ReceivedLetter, SendLetterRequest } from '@/types/letter'
import type { Song } from '@/types/song'

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_RECEIVED_LETTERS: ReceivedLetter[] = [
  {
    id: 1,
    senderId: 1,
    senderNickname: '튜니',
    content: '오늘도 충분히 예쁘고 멋진 하루 보내길 바라 💕',
    song: {
      title: '어떻게 이별까지 사랑하겠어, 널 사랑하는 거지',
      artist: '악동뮤지션',
      albumImageUrl: 'https://placehold.co/40x40',
    },
    sentAt: minutesAgo(3),
  },
  {
    id: 2,
    senderId: 1,
    senderNickname: '튜니',
    content: '오늘도 충분히 예쁘고 멋진 하루 보내길 바라 💕',
    song: { title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/40x40' },
    sentAt: minutesAgo(3),
  },
]

const MOCK_SONGS: Song[] = [
  { title: 'Pretty Girl', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/24x24' },
  { title: 'Deja Vu', artist: 'RESCENE', albumImageUrl: 'https://placehold.co/24x24' },
  { title: 'not the same', artist: 'ROSÉ', albumImageUrl: 'https://placehold.co/24x24' },
]

export async function mockGetLetterRecipient(userId: number) {
  const member = MOCK_ROOM_DETAIL.members.find((m) => m.id === userId)
  return { id: userId, nickname: member?.nickname ?? MOCK_USER_PROFILE.nickname }
}

export async function mockSearchSongs(query: string) {
  const keyword = query.trim().toLowerCase()
  const matches = MOCK_SONGS.filter(({ title, artist }) =>
    `${title} ${artist}`.toLowerCase().includes(keyword),
  )
  return matches.length > 0 ? matches : MOCK_SONGS
}

export async function mockGetReceivedLetter(letterId: number) {
  return MOCK_RECEIVED_LETTERS.find((letter) => letter.id === letterId) ?? null
}

export async function mockDeleteLetter(letterId: number) {
  return { id: letterId }
}

export async function mockSendLetter(request: SendLetterRequest) {
  return { id: Date.now(), ...request }
}
