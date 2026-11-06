import type { CharacterColorId } from '@/constants/characters'
import type { Feed } from './feed'
import type { Song } from './song'

export type Room = {
  id: number
  name: string
  description: string
  imageUrl: string
}

export type RoomMemberRole = 'owner' | 'member'

export type RoomMember = {
  id: number
  nickname: string
  role: RoomMemberRole
  characterColorId: CharacterColorId
  song: Song
  similarity: number
  distanceKm: number
}

export type RoomDetail = Room & {
  myRole: RoomMemberRole
  members: RoomMember[]
  feeds: Feed[]
  playlist: (Song & { id: number })[]
}

export type CreatedRoom = Room & {
  inviteUrl: string
}

export type CreateRoomRequest = {
  name: string
  description: string
  image: File | null
  password: string | null
}
