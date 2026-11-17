import type { DistanceRange } from './user'

// 카드 문구에 쓸 함께 좋아하는 항목 종류
export type TasteReasonType = 'MUSIC' | 'ARTIST' | 'GENRE'

export type TasteReason = {
  type: TasteReasonType
  name: string
  // 앨범 커버 또는 아티스트 이미지 (장르이거나 이미지가 없으면 null)
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
  // 상대의 취향 데이터가 없으면 null
  similarity: number | null
  distanceRange: DistanceRange | null
  reason: TasteReason | null
  letterReceivable: boolean
}
