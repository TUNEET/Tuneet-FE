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

export async function getReceivedLetters(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<LetterPage<ReceivedLetter>>>('/api/v1/letters', {
    params: { cursor, size },
  })
  return data.data
}

export async function getSentLetters(cursor?: number, size = PAGE_SIZE) {
  const { data } = await instance.get<ApiResponse<LetterPage<SentLetter>>>('/api/v1/letters/sent', {
    params: { cursor, size },
  })
  return data.data
}

export async function getReceivedLetter(letterId: number) {
  const { data } = await instance.get<ApiResponse<ReceivedLetter>>(`/api/v1/letters/${letterId}`)
  return data.data
}

export async function deleteReceivedLetter(letterId: number) {
  await instance.delete<ApiResponse<unknown>>(`/api/v1/letters/${letterId}`)
}

export async function deleteAllReceivedLetters() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/letters')
}

export async function deleteAllSentLetters() {
  await instance.delete<ApiResponse<unknown>>('/api/v1/letters/sent')
}

export async function sendLetter(receiverId: number, body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>('/api/v1/letters', {
    ...body,
    receiverId,
  })
  return data.data
}

export async function sendRandomLetter(body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>(
    '/api/v1/letters/random',
    body,
  )
  return data.data
}

export async function replyLetter(letterId: number, body: LetterContentRequest) {
  const { data } = await instance.post<ApiResponse<LetterSendResponse>>(
    `/api/v1/letters/${letterId}/replies`,
    body,
  )
  return data.data
}

export async function getLetterQuota() {
  const { data } = await instance.get<ApiResponse<LetterQuota>>('/api/v1/letters/remaining')
  return data.data
}

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
