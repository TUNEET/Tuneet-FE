import type { ApiResponse } from '@/types/api'
import type {
  AvailabilityResponse,
  MyProfileResponse,
  ProfileAddRequest,
  ProfileAddResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth'
import type {
  BlockedUserListResponse,
  OtherUserProfileResponse,
  SettingsResponse,
} from '@/types/user'
import { cachedRequest, invalidateRequest } from '@/utils/requestCache'
import { instance } from './instance'

const MY_PROFILE_KEY = 'myProfile'
// 내 정보는 여러 화면에서 쓰므로 잠깐 저장해 두고 같이 쓴다 (프로필을 바꾸면 바로 지운다)
const MY_PROFILE_TTL_MS = 60_000
const invalidateMyProfile = () => invalidateRequest(MY_PROFILE_KEY)

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
  invalidateMyProfile()
  return data.data
}

export async function replaceGenres(genres: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/genres', { genres })
  invalidateMyProfile()
}

export async function replaceArtists(artistIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/artists', { artistIds })
  invalidateMyProfile()
}

export async function replaceMusics(musicIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/musics', { musicIds })
  invalidateMyProfile()
}

export async function updateProfileMusic(musicId: string) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/profile-music', { musicId })
  invalidateMyProfile()
}

export function getMyProfile() {
  return cachedRequest(
    MY_PROFILE_KEY,
    async () => {
      const { data } = await instance.get<ApiResponse<MyProfileResponse>>('/api/v1/users')
      return data.data
    },
    MY_PROFILE_TTL_MS,
  )
}

export async function getUserProfile(userId: number) {
  const { data } = await instance.get<ApiResponse<OtherUserProfileResponse>>(
    `/api/v1/users/${userId}`,
  )
  return data.data
}

/** 최근 차단순 */
export async function getBlockedUsers() {
  const { data } =
    await instance.get<ApiResponse<BlockedUserListResponse>>('/api/v1/users/me/blocks')
  return data.data.blockedUsers
}

export async function blockUser(userId: number) {
  await instance.post<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}

export async function unblockUser(userId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}

export async function getSettings() {
  const { data } = await instance.get<ApiResponse<SettingsResponse>>('/api/v1/users/me/settings')
  return data.data
}

export async function updateSettings(body: {
  locationVisible: boolean
  letterReceivable: boolean
  locationAgreed: boolean
}) {
  const { data } = await instance.patch<ApiResponse<SettingsResponse>>(
    '/api/v1/users/me/settings',
    body,
  )
  return data.data
}

export async function withdraw() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/users')
}
