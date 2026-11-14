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

/** 공통 취향 섹션에 보여줄 값 */
export type CommonTaste = {
  artists: { name: string; imageUrl: string | null }[]
  songs: { title: string; artist: string; albumImageUrl: string | null }[]
  genres: string[]
}

/** 거리 구간 */
export type DistanceRange = 'WITHIN_1KM' | 'WITHIN_3KM' | 'WITHIN_5KM' | 'OVER_5KM'

type UserMusicResponse = {
  /** 노래 검색 결과 id */
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
}

type UserGenreResponse = { genreId: number; genreName: string; displayName: string }

type UserArtistResponse = {
  /** 아티스트 검색 결과 id */
  artistId: string
  name: string
  artistImage: string | null
}

/** 다른 사용자 프로필 조회 응답 */
export type OtherUserProfileResponse = {
  userId: number
  nickname: string
  profilePicture: string | null
  profileMusic: UserMusicResponse | null
  genres: UserGenreResponse[]
  favoriteArtists: UserArtistResponse[]
  /** 취향 유사도 (%) */
  similarity: number
  distanceRange: DistanceRange
  /** 편지 받기를 켜 두었는지 */
  letterReceivable: boolean
  /** 내가 이 사용자를 차단했는지 */
  isBlocked: boolean
  /** 나와 함께 좋아하는 취향 */
  common: {
    artists: UserArtistResponse[]
    music: UserMusicResponse | null
    genres: UserGenreResponse[]
  }
}
