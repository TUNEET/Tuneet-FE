/**
 * 새 버전 배포 직후, 이전 버전 화면이 사라진 JS 파일(청크)을 불러오다 실패하는 경우를
 * 새로고침 한 번으로 복구한다. 무한 새로고침을 막기 위해 일정 시간 내 재시도는 하지 않는다.
 */
const CHUNK_RELOAD_KEY = 'chunkReloadedAt'
const RELOAD_COOLDOWN_MS = 10_000

const CHUNK_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i

export function isChunkLoadError(error: unknown) {
  return error instanceof Error && CHUNK_ERROR_PATTERN.test(error.message)
}

/** 새로고침을 시도했으면 true, 직전에 이미 시도해서 건너뛰었으면 false */
export function reloadOnceForChunkError() {
  try {
    const lastReloadedAt = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY))

    if (Date.now() - lastReloadedAt < RELOAD_COOLDOWN_MS) return false

    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()))
  } catch {
    // 저장소를 쓸 수 없으면 무한 새로고침 위험이 있으므로 새로고침하지 않는다
    return false
  }

  window.location.reload()
  return true
}
