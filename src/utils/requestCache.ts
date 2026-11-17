type CacheEntry = { promise: Promise<unknown>; expiresAt: number }

const cache = new Map<string, CacheEntry>()

// 같은 요청을 일정 시간 동안 한 번만 보내고 결과를 같이 쓴다 (동시에 들어온 요청도 하나로 합친다)
export function cachedRequest<T>(key: string, request: () => Promise<T>, ttlMs: number) {
  const entry = cache.get(key)
  if (entry && entry.expiresAt > Date.now()) return entry.promise as Promise<T>

  const promise = request()
  cache.set(key, { promise, expiresAt: Date.now() + ttlMs })
  // 실패한 결과는 저장하지 않아 다음에 다시 요청한다
  promise.catch(() => {
    if (cache.get(key)?.promise === promise) cache.delete(key)
  })
  return promise
}

// key를 넘기면 그 요청만, 넘기지 않으면 저장한 요청을 모두 지운다
export function invalidateRequest(key?: string) {
  if (key) cache.delete(key)
  else cache.clear()
}
