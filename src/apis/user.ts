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

/** 선호 장르 교체 (1개 이상, 서버 장르 값: K_POP 등) */
export async function replaceGenres(genres: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/genres', { genres })
}

/** 선호 아티스트 교체 (아티스트 검색 결과 id, 3~20팀) */
export async function replaceArtists(artistIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/artists', { artistIds })
}

/** 좋아하는 노래 교체 (노래 검색 결과 id, 1~20곡) */
export async function replaceMusics(musicIds: string[]) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/musics', { musicIds })
}

/** 프로필 음악(나를 닮은 음악) 설정 (노래 검색 결과 id) */
export async function updateProfileMusic(musicId: string) {
  await instance.put<ApiResponse<unknown>>('/api/v1/users/me/profile-music', { musicId })
}

export async function getMyProfile() {
  const { data } = await instance.get<ApiResponse<MyProfileResponse>>('/api/v1/users')
  return data.data
}

/** 다른 사용자 프로필 조회 */
export async function getUserProfile(userId: number) {
  const { data } = await instance.get<ApiResponse<OtherUserProfileResponse>>(
    `/api/v1/users/${userId}`,
  )
  return data.data
}

/** 사용자 차단 (서로 피드 조회·편지 발송 불가) */
export async function blockUser(userId: number) {
  await instance.post<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}

/** 사용자 차단 해제 */
export async function unblockUser(userId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/users/me/blocks/${userId}`)
}
