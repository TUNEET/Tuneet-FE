import type { Song } from './song'

export type Profile = {
  nickname: string
  characterImageUrl: string
  photoUrl?: string | null
  song: Pick<Song, 'title' | 'artist'> | null
  genres: string[]
  artists: string[]
}

export type CommonTaste = {
  artists: { name: string; imageUrl: string | null }[]
  songs: { title: string; artist: string; albumImageUrl: string | null }[]
  genres: string[]
}

export type DistanceRange = 'WITHIN_1KM' | 'WITHIN_3KM' | 'WITHIN_5KM' | 'OVER_5KM'

type UserMusicResponse = {
  musicId: string
  title: string
  artist: string
  musicPicture: string | null
}

type UserGenreResponse = { genreId: number; genreName: string; displayName: string }

type UserArtistResponse = {
  artistId: string
  name: string
  artistImage: string | null
}

export type OtherUserProfileResponse = {
  userId: number
  nickname: string
  profilePicture: string | null
  profileMusic: UserMusicResponse | null
  genres: UserGenreResponse[]
  favoriteArtists: UserArtistResponse[]
  similarity: number | null
  distanceRange?: DistanceRange | null
  letterReceivable: boolean
  isBlocked: boolean
  common: {
    artists: UserArtistResponse[]
    music: UserMusicResponse | null
    genres: UserGenreResponse[]
  }
}
