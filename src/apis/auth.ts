import axios from 'axios'
import type { ApiResponse } from '@/types/api'
import type { LoginRequest, TokenResponse } from '@/types/auth'
import { instance } from './instance'

export async function login(body: LoginRequest) {
  const { data } = await instance.post<ApiResponse<TokenResponse>>('/api/v1/auth/login', body)
  return data.data
}

/** 인터셉터를 타지 않도록 기본 axios로 호출한다 (재발급 실패 시 무한 반복 방지) */
export async function reissue(refreshToken: string) {
  const { data } = await axios.post<ApiResponse<TokenResponse>>(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reissue`,
    { refreshToken },
    { timeout: 10000 },
  )
  return data.data
}

export async function logout() {
  await instance.delete<ApiResponse<null>>('/api/v1/auth/logout')
}
