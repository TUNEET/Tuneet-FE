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
} as const

export const getUserProfilePath = (userId: number) =>
  generatePath(ROUTES.userProfile, { userId: String(userId) })
