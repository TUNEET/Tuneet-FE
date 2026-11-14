import type { CharacterColorId } from '@/constants/characters'
import type { Feed } from './feed'
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
  // 프로필 사진이 없을 때 캐릭터 배경색
  characterColorId: CharacterColorId
  profilePicture: string | null
  song: Song | null
  // 나와의 매칭률 (%). 방 홈 멤버 목록에는 없다
  similarity: number | null
}

export type PlaylistSong = Song & { id: number }

export type RoomDetail = Room & {
  myRole: RoomMemberRole
  inviteCode: string
  hasPassword: boolean
  memberCount: number
  members: RoomMember[]
  feeds: Feed[]
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
  // 이미지 업로드 API로 먼저 올린 주소
  imageUrl: string | null
  // 숫자 4자리, 없으면 null
  password: string | null
}

export type RoomRoleResponse = 'OWNER' | 'MEMBER'

export type RoomMusicResponse = {
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
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
  // 이미 참여 중인 방이었는지 (true면 비밀번호 확인 없이 바로 이동)
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
  // 내가 쓴 포스트인지 (삭제 버튼 표시용)
  isMine: boolean
}

export type RoomPlaylistResponse = {
  roomPlaylistId: number
  position: number
  music: RoomMusicResponse
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
