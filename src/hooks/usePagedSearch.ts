import { useEffect, useRef, useState } from 'react'
import type { SearchPage } from '@/types/music'

const SEARCH_DEBOUNCE_MS = 200

type PageData<T> = { items: T[]; totalPages: number }

export type PagedSearchResult<T> = PageData<T> & { keyword: string; page: number }

type UsePagedSearchOptions<T> = {
  search: (keyword: string, page: number, size: number) => Promise<SearchPage<T>>
  keyword: string
  page: number
  pageSize: number
  /** 다음 페이지를 미리 받을 때 이미지도 같이 받아 두려고 쓴다 */
  getImage?: (item: T) => string | null | undefined
}

/**
 * 페이지 단위 검색. 받은 페이지는 기억해 두고 다음 페이지를 미리 받아서
 * 페이지를 넘길 때 바로 보이게 한다. 입력 중일 때만 잠깐 기다렸다가 요청한다
 */
export function usePagedSearch<T>({
  search,
  keyword,
  page,
  pageSize,
  getImage,
}: UsePagedSearchOptions<T>) {
  const [result, setResult] = useState<PagedSearchResult<T> | null>(null)
  const [isError, setIsError] = useState(false)
  // 진행 중인 요청도 담아서 미리 받기와 실제 요청이 겹치지 않게 한다
  const cacheRef = useRef(new Map<string, Promise<PageData<T>>>())
  const getImageRef = useRef(getImage)

  useEffect(() => {
    getImageRef.current = getImage
  }, [getImage])

  useEffect(() => {
    if (!keyword) return

    const cache = cacheRef.current
    const load = (targetPage: number) => {
      const key = `${keyword}\u0000${targetPage}`
      const cached = cache.get(key)
      if (cached) return cached

      const request = search(keyword, targetPage, pageSize).then(({ items, totalPages }) => ({
        items,
        totalPages,
      }))
      cache.set(key, request)
      // 실패한 페이지는 다시 시도할 수 있게 지운다
      request.catch(() => cache.delete(key))
      return request
    }

    const prefetch = (targetPage: number) => {
      load(targetPage)
        .then(({ items }) => {
          const toImage = getImageRef.current
          if (!toImage) return
          items.forEach((item) => {
            const src = toImage(item)
            if (src) new Image().src = src
          })
        })
        .catch(() => {})
    }

    let isStale = false
    const isCached = cache.has(`${keyword}\u0000${page}`)
    // 검색어를 바꿀 때만 입력이 끝나길 기다리고, 페이지 이동은 바로 요청한다
    const delay = isCached || page !== 1 ? 0 : SEARCH_DEBOUNCE_MS

    const timer = setTimeout(() => {
      load(page)
        .then((data) => {
          if (isStale) return
          setResult({ keyword, page, ...data })
          setIsError(false)
          if (page < data.totalPages) prefetch(page + 1)
        })
        .catch(() => {
          if (isStale) return
          setResult({ keyword, page, items: [], totalPages: 0 })
          setIsError(true)
        })
    }, delay)

    return () => {
      isStale = true
      clearTimeout(timer)
    }
  }, [search, keyword, page, pageSize])

  return { result, isError }
}
