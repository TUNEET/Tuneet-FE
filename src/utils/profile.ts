import characterProfile from '@/assets/images/character-profile.png'
import type { MyProfileResponse } from '@/types/auth'
import type { OtherUserProfileResponse, Profile } from '@/types/user'

type ProfileSource = Pick<
  MyProfileResponse | OtherUserProfileResponse,
  'nickname' | 'profilePicture' | 'profileMusic' | 'genres' | 'favoriteArtists'
>

export const toProfileCard = ({
  nickname,
  profilePicture,
  profileMusic,
  genres,
  favoriteArtists,
}: ProfileSource): Profile => ({
  nickname: nickname ?? '',
  characterImageUrl: characterProfile,
  photoUrl: profilePicture,
  song: profileMusic && { title: profileMusic.title, artist: profileMusic.artist },
  genres: genres.map(({ displayName }) => displayName),
  artists: favoriteArtists.map(({ name }) => name),
})
