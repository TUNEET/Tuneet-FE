import type { ApiResponse } from '@/types/api'
import type {
  AvailabilityResponse,
  MyProfileResponse,
  ProfileAddRequest,
  ProfileAddResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth'
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

export async function getMyProfile() {
  const { data } = await instance.get<ApiResponse<MyProfileResponse>>('/api/v1/users')
  return data.data
}
