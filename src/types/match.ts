export type TasteMatchType = 'artist' | 'song'

export type TasteMatch = {
  id: number
  nickname: string
  similarity: number
  distanceKm: number
  matchType: TasteMatchType
  name: string
  imageUrl: string
}
