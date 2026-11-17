import type { ApiResponse } from '@/types/api'
import type {
  RecommendationListResponse,
  RecommendationUserResponse,
  TasteMatch,
} from '@/types/match'
import { instance } from './instance'

// 위치정보 수집·이용 미동의
export const LOCATION_NOT_AGREED_CODE = 'U4007'
// 위치 노출 OFF
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

// 마지막으로 받은 추천 사용자 (다시 뽑지 않음)
export async function getRecommendations() {
  const { data } = await instance.get<ApiResponse<RecommendationListResponse>>(
    '/api/v1/users/me/recommendations',
  )
  return toRecommendations(data.data)
}

// 현재 위치로 추천 사용자를 새로 받는다 (최대 5명)
export async function refreshRecommendations(position: { latitude: number; longitude: number }) {
  const { data } = await instance.post<ApiResponse<RecommendationListResponse>>(
    '/api/v1/users/me/recommendations',
    position,
  )
  return toRecommendations(data.data)
}
