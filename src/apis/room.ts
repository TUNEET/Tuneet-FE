import type { CharacterColorId } from '@/constants/characters'
import type { ApiResponse } from '@/types/api'
import type {
  CreatedRoom,
  CreateRoomRequest,
  Room,
  RoomCreateResponse,
  RoomDetail,
  RoomEntryResponse,
  RoomHomeResponse,
  RoomMember,
  RoomMembers,
  RoomMembersResponse,
  RoomMusicResponse,
  RoomRoleResponse,
  RoomSummaryResponse,
  RoomUserResponse,
} from '@/types/room'
import type { Song } from '@/types/song'
import { getInviteUrl } from '@/utils/invite'
import { instance } from './instance'

const CHARACTER_COLOR_COUNT = 6

const toRole = (role: RoomRoleResponse) => (role === 'OWNER' ? 'owner' : 'member')

// 프로필 사진이 없는 멤버는 사용자 번호로 캐릭터 배경색을 고정한다
const toCharacterColorId = (userId: number) =>
  ((userId % CHARACTER_COLOR_COUNT) + 1) as CharacterColorId

const toSong = ({ title, artist, musicPicture }: RoomMusicResponse): Song => ({
  title,
  artist,
  albumImageUrl: musicPicture ?? '',
})

const toRoom = ({
  roomId,
  roomTitle,
  roomDescription,
  roomPicture,
}: RoomSummaryResponse): Room => ({
  id: roomId,
  name: roomTitle,
  description: roomDescription ?? '',
  imageUrl: roomPicture,
})

const toMember = (
  { userId, nickname, role, profilePicture }: RoomUserResponse,
  extra: Pick<RoomMember, 'song' | 'similarity'> = { song: null, similarity: null },
): RoomMember => ({
  id: userId,
  nickname,
  role: toRole(role),
  characterColorId: toCharacterColorId(userId),
  profilePicture,
  ...extra,
})

export async function getMyRooms() {
  const { data } =
    await instance.get<ApiResponse<{ rooms: RoomSummaryResponse[] }>>('/api/v1/rooms')
  return data.data.rooms.map(toRoom)
}

export async function createRoom({
  name,
  description,
  imageUrl,
  password,
}: CreateRoomRequest): Promise<CreatedRoom> {
  const { data } = await instance.post<ApiResponse<RoomCreateResponse>>('/api/v1/rooms', {
    roomTitle: name,
    roomDescription: description || null,
    roomPicture: imageUrl,
    password,
  })
  return { ...toRoom(data.data), inviteUrl: getInviteUrl(data.data.inviteCode) }
}

// 잠긴 방에 비밀번호 없이 요청하면 R4002 에러가 온다
export async function enterRoom(inviteCode: string, password: string | null = null) {
  const { data } = await instance.post<ApiResponse<RoomEntryResponse>>('/api/v1/rooms/entry', {
    inviteCode,
    password,
  })
  return data.data
}

export async function getRoomHome(roomId: number): Promise<RoomDetail> {
  const { data } = await instance.get<ApiResponse<RoomHomeResponse>>(`/api/v1/rooms/${roomId}`)
  const room = data.data

  return {
    ...toRoom(room),
    myRole: toRole(room.myRole),
    inviteCode: room.inviteCode,
    hasPassword: room.hasPassword,
    memberCount: room.memberCount,
    members: room.roomUsers.map((user) => toMember(user)),
    feeds: room.roomPosts.map(({ roomPostId, nickname, music, content, createdAt }) => ({
      id: roomPostId,
      nickname,
      song: toSong(music),
      content,
      createdAt,
    })),
    playlist: [...room.roomPlaylists]
      .sort((a, b) => a.position - b.position)
      .map(({ roomPlaylistId, music }) => ({ id: roomPlaylistId, ...toSong(music) })),
  }
}

// 나를 제외한 멤버 목록
export async function getRoomMembers(roomId: number): Promise<RoomMembers> {
  const { data } = await instance.get<ApiResponse<RoomMembersResponse>>(
    `/api/v1/rooms/${roomId}/users`,
  )
  const room = data.data

  return {
    ...toRoom({ ...room, roomPicture: null }),
    members: room.roomUsers.map(({ music, matchPercent, ...user }) =>
      toMember(user, { song: music && toSong(music), similarity: matchPercent }),
    ),
  }
}

// 방장만 가능
export async function deleteRoom(roomId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}`)
}

// 방장이 나가면 가장 먼저 참여한 멤버에게 방장이 넘어가고, 혼자면 방이 삭제된다
export async function leaveRoom(roomId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}/users/me`)
}
