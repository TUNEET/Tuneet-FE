import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { ROUTES } from '@/constants/routes'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/utils/auth'
import { reissue } from './auth'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/** 동시에 여러 요청이 401을 받아도 재발급은 한 번만 */
let reissuePromise: Promise<string> | null = null

async function reissueAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const tokens = await reissue(refreshToken)
  setTokens(tokens)
  return tokens.accessToken
}

function logout() {
  clearTokens()
  window.location.replace(ROUTES.onboarding)
}

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as RetryConfig | undefined

    // 토큰을 실어 보낸 요청의 401만 만료로 본다.
    // 로그인 실패(A4001)처럼 토큰 없이 보낸 요청의 401은 그대로 화면에 넘긴다.
    const sentToken = Boolean(config?.headers.Authorization)

    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 401 ||
      !config ||
      !sentToken ||
      config._retry
    ) {
      return Promise.reject(error)
    }

    config._retry = true

    try {
      reissuePromise ??= reissueAccessToken().finally(() => {
        reissuePromise = null
      })
      const accessToken = await reissuePromise
      config.headers.Authorization = `Bearer ${accessToken}`
      return instance(config)
    } catch (reissueError) {
      logout()
      return Promise.reject(reissueError)
    }
  },
)
