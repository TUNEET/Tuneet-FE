import type { ApiResponse } from '@/types/api'
import { instance } from './instance'

export type ImageDirectory = 'ROOM' | 'PROFILE'

/** 이미지를 업로드하고 접근 가능한 URL을 받는다 */
export async function uploadImage(file: File, directory: ImageDirectory) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await instance.post<ApiResponse<{ imageUrl: string }>>(
    '/api/v1/images',
    formData,
    { params: { directory } },
  )
  return data.data.imageUrl
}
