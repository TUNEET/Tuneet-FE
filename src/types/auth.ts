export type LoginRequest = {
  email: string
  password: string
}

export type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export type SignUpRequest = {
  email: string
  password: string
  passwordConfirm: string
  termsAgreed: boolean
  privacyAgreed: boolean
  locationAgreed?: boolean
}

export type SignUpResponse = {
  userId: number
  email: string
  createdAt: string
}

export type AvailabilityResponse = {
  available: boolean
}

export type ProfileAddRequest = {
  nickname: string
  profilePicture?: string
}

export type ProfileAddResponse = {
  userId: number
  nickname: string
  profilePicture: string | null
  modifiedAt: string
}

export type MyProfileResponse = {
  userId: number
  nickname: string | null
  profilePicture: string | null
  profileMusic: {
    musicId: number
    title: string
    artist: string
    musicPicture: string | null
  } | null
  genres: { genreId: number; genreName: string; displayName: string }[]
  favoriteArtists: { artistId: number; name: string; artistImage: string | null }[]
}
