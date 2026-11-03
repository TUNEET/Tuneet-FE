import type { CreatedRoom, CreateRoomRequest } from '@/types/room'

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
  return { inviteCode, hasPassword: true }
}

export async function mockJoinRoom(_inviteCode: string, password?: string) {
  return password === undefined || password === MOCK_ROOM_PASSWORD
}
