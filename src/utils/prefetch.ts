// 미리 받아 둔 요청을 이 시간 안에 화면이 가져가면 그대로 쓴다 (오래된 데이터를 보여주지 않도록 짧게 둔다)
const PREFETCH_TTL_MS = 5_000
// 화면이 한 번 가져간 뒤에는 이 시간 동안만 다시 쓸 수 있다 (개발 모드에서 화면 코드가 두 번 실행되는 경우)
const RETAKE_WINDOW_MS = 1_000

export type PageRequest<T> = { key: string; request: () => Promise<T> }

type Entry = { promise: Promise<unknown>; createdAt: number; takenAt: number | null }

const prefetched = new Map<string, Entry>()

// 페이지 코드를 받는 동안 데이터 요청을 먼저 출발시킨다
export function prefetch<T>({ key, request }: PageRequest<T>) {
  const promise = request()
  // 화면이 가져가기 전에 실패해도 처리되지 않은 에러로 남지 않게 한다 (에러는 화면에서 다시 받는다)
  promise.catch(() => {})
  prefetched.set(key, { promise, createdAt: Date.now(), takenAt: null })
}

// 미리 받아 둔 요청이 있으면 그걸 쓰고, 없으면 새로 요청한다
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
