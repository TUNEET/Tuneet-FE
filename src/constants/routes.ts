import { generatePath } from 'react-router'

export const ROUTES = {
  home: '/',
  explore: '/explore',
  exploreWrite: '/explore/write',
  exploreEdit: '/explore/write/:feedId',
  exploreNotifications: '/explore/notifications',
  feed: '/explore/feeds/:feedId',
  matching: '/matching',
  my: '/my',
  onboarding: '/onboarding',
  signup: '/signup',
  login: '/login',
  profileSetup: '/profile-setup',
  youtubeMusicCallback: '/oauth/youtube-music',
  letterbox: '/matching/letters',
  welcomeLetter: '/matching/letters/welcome',
  letter: '/matching/letters/:letterId',
  letterReply: '/matching/letters/:letterId/reply',
  sentLetter: '/matching/letters/sent/:letterId',
  recommendedUsers: '/matching/recommended',
  userProfile: '/matching/users/:userId',
  letterWrite: '/matching/users/:userId/letter',
  anonymousLetterWrite: '/matching/letter',
  createRoom: '/matching/rooms/new',
  joinRoom: '/matching/rooms/join',
  room: '/matching/rooms/:roomId',
  roomMembers: '/matching/rooms/:roomId/members',
  roomFeeds: '/matching/rooms/:roomId/feeds',
  roomFeedWrite: '/matching/rooms/:roomId/feeds/write',
  roomPlaylist: '/matching/rooms/:roomId/playlist',
} as const

export const getExploreEditPath = (feedId: number) =>
  generatePath(ROUTES.exploreEdit, { feedId: String(feedId) })

export const getFeedPath = (feedId: number) => generatePath(ROUTES.feed, { feedId: String(feedId) })

export const getUserProfilePath = (userId: number) =>
  generatePath(ROUTES.userProfile, { userId: String(userId) })

export const getLetterWritePath = (userId: number) =>
  generatePath(ROUTES.letterWrite, { userId: String(userId) })

export const getLetterReplyPath = (letterId: number) =>
  generatePath(ROUTES.letterReply, { letterId: String(letterId) })

export const getSentLetterPath = (letterId: number) =>
  generatePath(ROUTES.sentLetter, { letterId: String(letterId) })

export const getLetterPath = (letterId: number) =>
  generatePath(ROUTES.letter, { letterId: String(letterId) })

export const getRoomPath = (roomId: number) => generatePath(ROUTES.room, { roomId: String(roomId) })

export const getRoomMembersPath = (roomId: number) =>
  generatePath(ROUTES.roomMembers, { roomId: String(roomId) })

export const getRoomFeedsPath = (roomId: number) =>
  generatePath(ROUTES.roomFeeds, { roomId: String(roomId) })

export const getRoomFeedWritePath = (roomId: number) =>
  generatePath(ROUTES.roomFeedWrite, { roomId: String(roomId) })

export const getRoomPlaylistPath = (roomId: number) =>
  generatePath(ROUTES.roomPlaylist, { roomId: String(roomId) })
