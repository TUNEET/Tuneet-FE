export type ArtistCandidate = {
  artistId: string
  name: string
  likedSongs: number
}

export type PlatformSyncResponse = {
  likedMusicCount: number
  skippedVideoCount: number
  artistCandidates: ArtistCandidate[]
}

export type PlatformConnectOrigin = 'profileSetup' | 'settings'

export type PlatformConnectResult = {
  origin: PlatformConnectOrigin
  status: 'success' | 'failure'
  artistCandidates: ArtistCandidate[]
}
