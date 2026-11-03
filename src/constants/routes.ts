import { generatePath } from 'react-router'

export const ROUTES = {
  home: '/',
  explore: '/explore',
  matching: '/matching',
  my: '/my',
  recommendedUsers: '/matching/recommended',
  userProfile: '/matching/users/:userId',
  createRoom: '/matching/rooms/new',
  joinRoom: '/matching/rooms/join',
  room: '/matching/rooms/:roomId',
  roomMembers: '/matching/rooms/:roomId/members',
  roomFeeds: '/matching/rooms/:roomId/feeds',
  roomPlaylist: '/matching/rooms/:roomId/playlist',
} as const

export const getUserProfilePath = (userId: number) =>
  generatePath(ROUTES.userProfile, { userId: String(userId) })

export const getRoomPath = (roomId: number) => generatePath(ROUTES.room, { roomId: String(roomId) })

export const getRoomMembersPath = (roomId: number) =>
  generatePath(ROUTES.roomMembers, { roomId: String(roomId) })

export const getRoomFeedsPath = (roomId: number) =>
  generatePath(ROUTES.roomFeeds, { roomId: String(roomId) })

export const getRoomPlaylistPath = (roomId: number) =>
  generatePath(ROUTES.roomPlaylist, { roomId: String(roomId) })
