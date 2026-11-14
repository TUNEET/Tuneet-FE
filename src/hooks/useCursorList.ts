import { useCallback, useEffect, useRef, useState } from 'react'

type CursorPage<T> = { items: T[]; hasNext: boolean }

export function useCursorList<T>(
  fetchPage: (cursor?: number) => Promise<CursorPage<T>>,
  getCursor: (item: T) => number,
  onError?: (error: unknown) => void,
) {
  const [items, setItems] = useState<T[]>([])
  const [hasNext, setHasNext] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(true)

  useEffect(() => {
    let isStale = false

    fetchPage()
      .then((page) => {
        if (isStale) return
        setItems(page.items)
        setHasNext(page.hasNext)
      })
      .catch((error) => {
        if (!isStale) onError?.(error)
      })
      .finally(() => {
        if (isStale) return
        loadingRef.current = false
        setIsLoading(false)
      })

    return () => {
      isStale = true
    }
  }, [fetchPage, onError])

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasNext || items.length === 0) return

    loadingRef.current = true
    setIsLoading(true)
    try {
      const page = await fetchPage(getCursor(items[items.length - 1]))
      setItems((prev) => [...prev, ...page.items])
      setHasNext(page.hasNext)
    } catch (error) {
      setHasNext(false)
      onError?.(error)
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }, [fetchPage, getCursor, onError, hasNext, items])

  return { items, setItems, hasNext, isLoading, loadMore }
}
