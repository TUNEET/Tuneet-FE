import { getYoutubeMusicAuthorizeUrl } from '@/apis/platform'
import type { PlatformConnectOrigin, PlatformConnectResult } from '@/types/platform'

const ORIGIN_KEY = 'youtubeMusicConnectOrigin'
const RESULT_KEY = 'youtubeMusicConnectResult'

const readSession = (key: string) => {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

const writeSession = (key: string, value: string | null) => {
  try {
    if (value === null) sessionStorage.removeItem(key)
    else sessionStorage.setItem(key, value)
  } catch {
    return
  }
}

export async function startYoutubeMusicConnect(origin: PlatformConnectOrigin) {
  const url = await getYoutubeMusicAuthorizeUrl()
  writeSession(ORIGIN_KEY, origin)
  writeSession(RESULT_KEY, null)
  window.location.assign(url)
}

export function getConnectOrigin(): PlatformConnectOrigin {
  return readSession(ORIGIN_KEY) === 'settings' ? 'settings' : 'profileSetup'
}

export function saveConnectResult(result: PlatformConnectResult) {
  writeSession(ORIGIN_KEY, null)
  writeSession(RESULT_KEY, JSON.stringify(result))
}

export function peekConnectResult(origin: PlatformConnectOrigin) {
  const saved = readSession(RESULT_KEY)
  if (!saved) return null
  try {
    const result = JSON.parse(saved) as PlatformConnectResult
    return result.origin === origin ? result : null
  } catch {
    return null
  }
}

export function clearConnectResult() {
  writeSession(RESULT_KEY, null)
}

/**
 * 곡 id가 유튜브 영상 id가 아니라서 제목·아티스트로 검색한 화면을 연다.
 * 휴대폰에 유튜브 뮤직 앱이 있으면 앱으로 열린다
 */
export function getYoutubeMusicSearchUrl(title: string, artist: string) {
  return `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`
}
