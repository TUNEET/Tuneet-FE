/** 서버 공통 응답 형식 */
export type ApiResponse<T> = {
  success: boolean
  /** 성공 시 HTTP 상태 코드(200), 실패 시 에러 코드 문자열(예: A4001) */
  code: number | string
  message: string
  data: T
}
