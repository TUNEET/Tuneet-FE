import type { DistanceRange } from './user'

export type TasteReasonType = 'MUSIC' | 'ARTIST' | 'GENRE'

export type TasteReason = {
  type: TasteReasonType
  name: string
  imageUrl: string | null
}

export type RecommendationUserResponse = {
  userId: number
  nickname: string
  profilePicture: string | null
  matchPercent: number | null
  distanceRange: DistanceRange | null
  reason: TasteReason | null
  letterReceivable: boolean
}

export type RecommendationListResponse = {
  recommendedAt: string | null
  users: RecommendationUserResponse[]
}

export type TasteMatch = {
  id: number
  nickname: string
  similarity: number | null
  distanceRange: DistanceRange | null
  reason: TasteReason | null
  letterReceivable: boolean
}
