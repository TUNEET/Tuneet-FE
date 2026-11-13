import axios from 'axios'
import type { ApiResponse } from '@/types/api'

const DEFAULT_ERROR_MESSAGE = '잠시 후 다시 시도해 주세요.'

/** 서버 에러 응답({ success: false, code, message })에서 코드와 메시지를 꺼낸다 */
export function getApiError(error: unknown) {
  if (axios.isAxiosError<ApiResponse<null>>(error) && error.response?.data) {
    const { code, message } = error.response.data
    return { code: String(code), message: message || DEFAULT_ERROR_MESSAGE }
  }

  return { code: null, message: DEFAULT_ERROR_MESSAGE }
}
