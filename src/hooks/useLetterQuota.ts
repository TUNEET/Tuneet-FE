import { useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import { PAGE_DATA } from '@/apis/pageData'
import type { LetterQuota } from '@/types/letter'
import { takePrefetched } from '@/utils/prefetch'
import { useToast } from './useToast'

export function useLetterQuota() {
  const showToast = useToast()
  const [quota, setQuota] = useState<LetterQuota | null>(null)

  useEffect(() => {
    let isStale = false

    takePrefetched(PAGE_DATA.letterQuota)
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
