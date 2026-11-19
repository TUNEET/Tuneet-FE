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
  getImage?: (item: T) => string | null | undefined
}

export function usePagedSearch<T>({
  search,
  keyword,
  page,
  pageSize,
  getImage,
}: UsePagedSearchOptions<T>) {
  const [result, setResult] = useState<PagedSearchResult<T> | null>(null)
  const [isError, setIsError] = useState(false)
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
