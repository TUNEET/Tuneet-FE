import axios from 'axios'
import type { ApiResponse } from '@/types/api'

const DEFAULT_ERROR_MESSAGE = '잠시 후 다시 시도해 주세요.'

type FieldErrorMap = Record<string, string>

function isFieldErrorMap(data: unknown): data is FieldErrorMap {
  return (
    typeof data === 'object' &&
    data !== null &&
    Object.values(data).every((value) => typeof value === 'string')
  )
}

// messages: 에러 코드별로 화면에 보여줄 문구 (없는 코드는 서버 메시지를 쓴다)
export function getApiError(error: unknown, messages: Record<string, string> = {}) {
  if (axios.isAxiosError<ApiResponse<unknown>>(error) && error.response?.data) {
    const { code, message, data } = error.response.data
    return {
      code: String(code),
      message: messages[String(code)] || message || DEFAULT_ERROR_MESSAGE,
      fields: isFieldErrorMap(data) ? data : {},
    }
  }

  return { code: null, message: DEFAULT_ERROR_MESSAGE, fields: {} as FieldErrorMap }
}
