import type { ApiResponse } from '@/types/api'
import type {
  LetterContentRequest,
  LetterPage,
  LetterQuota,
  LetterSendResponse,
  ReceivedLetter,
  SentLetter,
} from '@/types/letter'
import { instance } from './instance'

const PAGE_SIZE = 20

/** 받은 편지 목록 (최신순). cursor는 앞 페이지 마지막 편지의 letterId */
export async function getReceivedLetters(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<LetterPage<ReceivedLetter>>>('/api/v1/letters', {
    params: { cursor, size },
  })
  return data.data
}

/** 보낸 편지 목록 (최신순). cursor는 앞 페이지 마지막 편지의 letterId */
export async function getSentLetters(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<LetterPage<SentLetter>>>('/api/v1/letters/sent', {
    params: { cursor, size },
  })
  return data.data
}

/** 받은 편지 상세 */
export async function getReceivedLetter(letterId: number) {
  const { data } = await instance.get<ApiResponse<ReceivedLetter>>(`/api/v1/letters/${letterId}`)
  return data.data
}

/** 받은 편지 한 통 삭제 */
export async function deleteReceivedLetter(letterId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/letters/${letterId}`)
}

/** 받은 편지 전체 삭제 */
export async function deleteAllReceivedLetters() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/letters')
}

/** 보낸 편지 전체 삭제 (받은 사람의 편지함에는 남는다) */
export async function deleteAllSentLetters() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/letters/sent')
}

/** 받는 사람을 정해서 편지 보내기 */
export async function sendLetter(receiverId: number, body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>('/api/v1/letters', {
    ...body,
    receiverId,
  })
  return data.data
}

/** 랜덤으로 고른 사람에게 편지 보내기 */
export async function sendRandomLetter(body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>(
    '/api/v1/letters/random',
    body,
  )
  return data.data
}

/** 받은 편지에 답장 보내기 (편지 한 통에 한 번만) */
export async function replyLetter(letterId: number, body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>(
    `/api/v1/letters/${letterId}/replies`,
    body,
  )
  return data.data
}

/** 오늘 남은 편지 수 */
export async function getLetterQuota() {
  const { data } = await instance.get<ApiResponse<LetterQuota>>('/api/v1/letters/remaining')
  return data.data
}

/**
 * 보낸 편지 한 통 찾기. 보낸 편지 상세 API가 없어서 보낸 편지 목록을 넘기며 찾는다.
 * TODO: 백엔드에 보낸 편지 상세 API(GET /api/v1/letters/sent/{letter-id})가 생기면 교체
 */
export async function findSentLetter(letterId: number, maxPages = 5) {
  let cursor: number | undefined
  for (let page = 0; page < maxPages; page++) {
    const { letters, hasNext } = await getSentLetters(cursor)
    const found = letters.find((letter) => letter.letterId === letterId)
    if (found) return found
    if (!hasNext || letters.length === 0) return null
    cursor = letters[letters.length - 1].letterId
  }
  return null
}
