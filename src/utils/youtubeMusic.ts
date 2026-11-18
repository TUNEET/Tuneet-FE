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
