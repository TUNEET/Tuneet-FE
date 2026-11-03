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
