type CacheEntry = { promise: Promise<unknown>; expiresAt: number }

const cache = new Map<string, CacheEntry>()

export function cachedRequest<T>(key: string, request: () => Promise<T>, ttlMs: number) {
  const entry = cache.get(key)
  if (entry && entry.expiresAt > Date.now()) return entry.promise as Promise<T>

  const promise = request()
  cache.set(key, { promise, expiresAt: Date.now() + ttlMs })
  promise.catch(() => {
    if (cache.get(key)?.promise === promise) cache.delete(key)
  })
  return promise
}

export function invalidateRequest(key?: string) {
  if (key) cache.delete(key)
  else cache.clear()
}
