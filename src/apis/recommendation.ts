import type { ApiResponse } from '@/types/api'
import type {
  RecommendationListResponse,
  RecommendationUserResponse,
  TasteMatch,
} from '@/types/match'
import { instance } from './instance'

export const LOCATION_NOT_AGREED_CODE = 'U4007'
export const LOCATION_HIDDEN_CODE = 'U4013'

const toTasteMatch = ({
  userId,
  nickname,
  matchPercent,
  distanceRange,
  reason,
  letterReceivable,
}: RecommendationUserResponse): TasteMatch => ({
  id: userId,
  nickname,
  similarity: matchPercent,
  distanceRange,
  reason,
  letterReceivable,
})

const toRecommendations = ({ recommendedAt, users }: RecommendationListResponse) => ({
  recommendedAt,
  users: users.map(toTasteMatch),
})

export async function getRecommendations() {
  const { data } = await instance.get<ApiResponse<RecommendationListResponse>>(
    '/api/v1/users/me/recommendations',
  )
  return toRecommendations(data.data)
}

export async function refreshRecommendations(position: { latitude: number; longitude: number }) {
  const { data } = await instance.post<ApiResponse<RecommendationListResponse>>(
    '/api/v1/users/me/recommendations',
    position,
  )
  return toRecommendations(data.data)
}
