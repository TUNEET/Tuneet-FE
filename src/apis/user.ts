import type { ApiResponse } from '@/types/api'
import type {
  AvailabilityResponse,
  MyProfileResponse,
  ProfileAddRequest,
  ProfileAddResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth'
import type { OtherUserProfileResponse } from '@/types/user'
import { instance } from './instance'

export async function signUp(body: SignUpRequest) {
  const { data } = await instance.post<ApiResponse<SignUpResponse>>('/api/v1/users', body)
  return data.data
}

export async function checkEmailAvailability(email: string) {
  const { data } = await instance.get<ApiResponse<AvailabilityResponse>>(
    '/api/v1/users/email/availability',
    { params: { email } },
  )
  return data.data.available
}

export async function checkNicknameAvailability(nickname: string) {
  const { data } = await instance.get<ApiResponse<AvailabilityResponse>>(
    '/api/v1/users/nickname/availability',
    { params: { nickname } },
  )
  return data.data.available
}

export async function addProfile(body: ProfileAddRequest) {
  const { data } = await instance.patch<ApiResponse<ProfileAddResponse>>('/api/v1/users/me', body)
  return data.data
}

export async function replaceGenres(genres: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/genres', { genres })
}

export async function replaceArtists(artistIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/artists', { artistIds })
}

export async function replaceMusics(musicIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/musics', { musicIds })
}

export async function updateProfileMusic(musicId: string) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/profile-music', { musicId })
}

export async function getMyProfile() {
  const { data } = await instance.get<ApiResponse<MyProfileResponse>>('/api/v1/users')
  return data.data
}

export async function getUserProfile(userId: number) {
  const { data } = await instance.get<ApiResponse<OtherUserProfileResponse>>(
    `/api/v1/users/${userId}`,
  )
  return data.data
}

export async function blockUser(userId: number) {
  await instance.post<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}

export async function unblockUser(userId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}
