import type { Song } from './song'

export type Profile = {
  nickname: string
  /** 프로필 사진이 없을 때 보여줄 캐릭터 이미지 */
  characterImageUrl: string
  /** 사용자가 올린 프로필 사진 (없으면 캐릭터 이미지) */
  photoUrl?: string | null
  /** 프로필 음악 (설정하지 않았으면 null) */
  song: Pick<Song, 'title' | 'artist'> | null
  genres: string[]
  artists: string[]
}

export type CommonTaste = {
  artists: { name: string; imageUrl: string }[]
  songs: Song[]
  genres: string[]
}

export type UserProfile = Profile & {
  id: number
  similarity: number
  distanceKm: number
  commonTaste: CommonTaste
}

/** 다른 사용자 프로필 조회 응답 (편지 쓰기에 필요한 칸만. 매칭 연동 때 나머지 추가) */
export type OtherUserProfileResponse = {
  userId: number
  nickname: string
  /** 편지 받기를 켜 두었는지 */
  letterReceivable: boolean
}
