import type { Song } from './song'

/** 페이지 단위 검색 응답 */
export type SearchPage<T> = {
  items: T[]
  page: number
  size: number
  hasNext: boolean
  /** 결과가 많으면 최대 20 */
  totalPages: number
}

export type MusicSearchItem = {
  /** 녹음 MBID. 노래를 저장하는 API(피드, 편지, 플레이리스트, 좋아하는 노래)에 그대로 보낸다 */
  id: string
  canonicalId?: string
  title: string
  artist: string
  artists: { id: string; name: string }[]
  album?: string
  durationMs?: number
  releaseYear?: number
  coverUrl?: string | null
}

export type ArtistSearchItem = {
  /** 아티스트 MBID. 선호 아티스트 교체 API에 그대로 보낸다 */
  id: string
  name: string
  /** 같은 이름의 아티스트를 구분하는 설명 */
  disambiguation: string | null
  songCount: number
}

/** 프로필에 고른 아티스트 (검색 결과에는 사진이 없어 image는 선택) */
export type ProfileArtist = {
  id?: string
  name: string
  image?: string | null
}

/** 프로필 설정에서 고른 곡 (프로필 음악, 좋아하는 노래) */
export type ProfileMusic = {
  /** 노래 검색 결과 id. 저장 API에 보낸다 */
  musicId?: string
  title: string
  artist: string
  albumImage: string
}

/** 같은 곡인지 비교할 키 */
export const getMusicKey = ({ musicId, title, artist }: ProfileMusic) =>
  musicId ?? `${title}-${artist}`

/** 노래 검색에서 고른 곡 */
export type SearchedSong = Song & { musicId: string }
