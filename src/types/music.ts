import type { Song } from './song'

export type SearchPage<T> = {
  items: T[]
  page: number
  size: number
  hasNext: boolean
  totalPages: number
}

export type MusicSearchItem = {
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
  id: string
  name: string
  disambiguation: string | null
  songCount: number
}

export type ProfileArtist = {
  id?: string
  name: string
  image?: string | null
}

export type ProfileMusic = {
  musicId?: string
  title: string
  artist: string
  albumImage: string
}

export const getMusicKey = ({ musicId, title, artist }: ProfileMusic) =>
  musicId ?? `${title}-${artist}`

export type SearchedSong = Song & { musicId: string }
