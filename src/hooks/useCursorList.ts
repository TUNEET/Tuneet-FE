import { useCallback, useEffect, useRef, useState } from 'react'

type CursorPage<T> = { items: T[]; hasNext: boolean; nextCursor?: number }

const MAX_EMPTY_PAGES = 5

export function useCursorList<T>(
  fetchPage: (cursor?: number) => Promise<CursorPage<T>>,
  getCursor: (item: T) => number,
  onError?: (error: unknown) => void,
) {
  const [items, setItems] = useState<T[]>([])
  const [hasNext, setHasNext] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(true)
  const nextCursorRef = useRef<number | undefined>(undefined)

  const fetchNonEmptyPage = useCallback(
    async (cursor?: number) => {
      let page = await fetchPage(cursor)
      for (
        let count = 1;
        count < MAX_EMPTY_PAGES &&
        page.items.length === 0 &&
        page.hasNext &&
        page.nextCursor !== undefined;
        count++
      ) {
        page = await fetchPage(page.nextCursor)
      }
      return page
    },
    [fetchPage],
  )

  useEffect(() => {
    let isStale = false

    fetchNonEmptyPage()
      .then((page) => {
        if (isStale) return
        nextCursorRef.current = page.nextCursor
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
  }, [fetchNonEmptyPage, onError])

  const loadMore = useCallback(async () => {
    const cursor =
      nextCursorRef.current ?? (items.length > 0 ? getCursor(items[items.length - 1]) : undefined)
    if (loadingRef.current || !hasNext || cursor === undefined) return

    loadingRef.current = true
    setIsLoading(true)
    try {
      const page = await fetchNonEmptyPage(cursor)
      nextCursorRef.current = page.nextCursor
      if (page.items.length > 0) setItems((prev) => [...prev, ...page.items])
      setHasNext(page.hasNext)
    } catch (error) {
      setHasNext(false)
      onError?.(error)
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }, [fetchNonEmptyPage, getCursor, onError, hasNext, items])

  return { items, setItems, hasNext, isLoading, loadMore }
}
