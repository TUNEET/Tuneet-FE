import type { ApiResponse } from '@/types/api'
import type {
  AvailabilityResponse,
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
