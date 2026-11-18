import type { CharacterColorId } from '@/constants/characters'
import type { Feed } from './feed'
import type { SearchedSong } from './music'
import type { Song } from './song'

export type Room = {
  id: number
  name: string
  description: string
  imageUrl: string | null
}

export type RoomMemberRole = 'owner' | 'member'

export type RoomMember = {
  id: number
  nickname: string
  role: RoomMemberRole
  characterColorId: CharacterColorId
  profilePicture: string | null
  song: Song | null
  similarity: number | null
}

export type PlaylistSong = { id: number; song: SearchedSong; deletable: boolean; liked: boolean }

export type RoomPost = Feed & { song: SearchedSong; isMine: boolean; liked: boolean }

export type RoomDetail = Room & {
  myRole: RoomMemberRole
  inviteCode: string
  hasPassword: boolean
  memberCount: number
  members: RoomMember[]
  feeds: RoomPost[]
  playlist: PlaylistSong[]
}

export type RoomMembers = Room & {
  members: RoomMember[]
}

export type CreatedRoom = Room & {
  inviteUrl: string
}

export type CreateRoomRequest = {
  name: string
  description: string
  imageUrl: string | null
  password: string | null
}

export type RoomRoleResponse = 'OWNER' | 'MEMBER'

export type RoomMusicResponse = {
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
  liked?: boolean | null
}

export type RoomSummaryResponse = {
  roomId: number
  roomPicture: string | null
  roomTitle: string
  roomDescription: string | null
}

export type RoomCreateResponse = RoomSummaryResponse & {
  inviteCode: string
  hasPassword: boolean
}

export type RoomEntryResponse = {
  roomId: number
  alreadyJoined: boolean
}

export type RoomUserResponse = {
  userId: number
  profilePicture: string | null
  nickname: string
  role: RoomRoleResponse
}

export type RoomPostResponse = {
  roomPostId: number
  nickname: string
  profilePicture: string | null
  music: RoomMusicResponse
  content: string
  createdAt: string
  isMine: boolean
}

export type RoomPlaylistResponse = {
  roomPlaylistId: number
  position: number
  music: RoomMusicResponse
  isMine: boolean
  deletable: boolean
}

export type RoomHomeResponse = RoomSummaryResponse & {
  inviteCode: string
  hasPassword: boolean
  myRole: RoomRoleResponse
  memberCount: number
  roomUsers: RoomUserResponse[]
  roomPosts: RoomPostResponse[]
  roomPlaylists: RoomPlaylistResponse[]
}

export type RoomMembersResponse = {
  roomId: number
  roomTitle: string
  roomDescription: string | null
  roomUsers: (RoomUserResponse & {
    music: RoomMusicResponse | null
    matchPercent: number | null
  })[]
}
