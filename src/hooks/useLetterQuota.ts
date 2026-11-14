import { useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import { getLetterQuota } from '@/apis/letter'
import type { LetterQuota } from '@/types/letter'
import { useToast } from './useToast'

/** 오늘 남은 편지 수. 불러오는 중이면 null */
export function useLetterQuota() {
  const showToast = useToast()
  const [quota, setQuota] = useState<LetterQuota | null>(null)

  useEffect(() => {
    let isStale = false

    getLetterQuota()
      .then((data) => {
        if (!isStale) setQuota(data)
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  return quota
}
