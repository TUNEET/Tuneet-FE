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
  RoomPlaylistResponse,
  RoomPost,
  RoomPostResponse,
  RoomRoleResponse,
  RoomSummaryResponse,
  RoomUserResponse,
  PlaylistSong,
} from '@/types/room'
import type { Song } from '@/types/song'
import { getInviteUrl } from '@/utils/invite'
import { instance } from './instance'

const CHARACTER_COLOR_COUNT = 6

const toRole = (role: RoomRoleResponse) => (role === 'OWNER' ? 'owner' : 'member')

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

const toFeed = ({
  roomPostId,
  nickname,
  music,
  content,
  createdAt,
  isMine,
}: RoomPostResponse): RoomPost => ({
  id: roomPostId,
  nickname,
  song: toSong(music),
  content,
  createdAt,
  isMine,
})

const toPlaylist = (items: RoomPlaylistResponse[]): PlaylistSong[] =>
  [...items]
    .sort((a, b) => a.position - b.position)
    .map(({ roomPlaylistId, music, deletable }) => ({
      id: roomPlaylistId,
      ...toSong(music),
      deletable,
    }))

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
    feeds: room.roomPosts.map(toFeed),
    playlist: toPlaylist(room.roomPlaylists),
  }
}

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

export async function deleteRoom(roomId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}`)
}

export async function leaveRoom(roomId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}/users/me`)
}

const POST_PAGE_SIZE = 20

export async function getRoomPosts(roomId: number, cursor?: number, size = POST_PAGE_SIZE) {
  const { data } = await instance.get<
    ApiResponse<{ roomPosts: RoomPostResponse[]; hasNext: boolean }>
  >(`/api/v1/rooms/${roomId}/posts`, { params: { cursor, size } })
  return { items: data.data.roomPosts.map(toFeed), hasNext: data.data.hasNext }
}

export async function createRoomPost(roomId: number, body: { musicId: string; content: string }) {
  const { data } = await instance.post<ApiResponse<RoomPostResponse>>(
    `/api/v1/rooms/${roomId}/posts`,
    body,
  )
  return toFeed(data.data)
}

export async function deleteRoomPost(roomId: number, postId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}/posts/${postId}`)
}

export async function getRoomPlaylist(roomId: number) {
  const { data } = await instance.get<ApiResponse<{ playlists: RoomPlaylistResponse[] }>>(
    `/api/v1/rooms/${roomId}/playlists`,
  )
  return toPlaylist(data.data.playlists)
}

export async function addRoomPlaylistSong(roomId: number, musicId: string) {
  const { data } = await instance.post<ApiResponse<RoomPlaylistResponse>>(
    `/api/v1/rooms/${roomId}/playlists`,
    { musicId },
  )
  return toPlaylist([data.data])[0]
}

export async function deleteRoomPlaylistSong(roomId: number, playlistId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}/playlists/${playlistId}`)
}

export async function clearRoomPlaylist(roomId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/rooms/${roomId}/playlists`)
}

export async function reorderRoomPlaylist(roomId: number, playlistIds: number[]) {
  const { data } = await instance.put<ApiResponse<{ playlists: RoomPlaylistResponse[] }>>(
    `/api/v1/rooms/${roomId}/playlists/order`,
    { playListIdList: playlistIds },
  )
  return toPlaylist(data.data.playlists)
}
