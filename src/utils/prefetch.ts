const PREFETCH_TTL_MS = 5_000
const RETAKE_WINDOW_MS = 1_000

export type PageRequest<T> = { key: string; request: () => Promise<T> }

type Entry = { promise: Promise<unknown>; createdAt: number; takenAt: number | null }

const prefetched = new Map<string, Entry>()

export function prefetch<T>({ key, request }: PageRequest<T>) {
  const promise = request()
  promise.catch(() => {})
  prefetched.set(key, { promise, createdAt: Date.now(), takenAt: null })
}

export function takePrefetched<T>({ key, request }: PageRequest<T>) {
  const entry = prefetched.get(key)
  const now = Date.now()
  const isFresh = entry && now - entry.createdAt < PREFETCH_TTL_MS
  const canTake = entry && (entry.takenAt === null || now - entry.takenAt < RETAKE_WINDOW_MS)

  if (entry && isFresh && canTake) {
    entry.takenAt ??= now
    return entry.promise as Promise<T>
  }
  return request()
}
