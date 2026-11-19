import { ROUTES } from '@/constants/routes'

const INVITE_LINK_PATTERN = /\/invite\/([A-Za-z0-9_-]+)/
const INVITE_CODE_PATTERN = /^[A-Za-z0-9_-]+$/
const PENDING_INVITE_KEY = 'pendingInviteCode'

export function parseInviteCode(text: string) {
  return text.match(INVITE_LINK_PATTERN)?.[1] ?? null
}

export function isValidInviteCode(code: string | null | undefined): code is string {
  return !!code && INVITE_CODE_PATTERN.test(code)
}

export function getInviteUrl(inviteCode: string) {
  return `${window.location.origin}/invite/${inviteCode}`
}

export function getInviteJoinPath(inviteCode: string) {
  return `${ROUTES.joinRoom}?code=${inviteCode}`
}

export function savePendingInviteCode(inviteCode: string) {
  try {
    sessionStorage.setItem(PENDING_INVITE_KEY, inviteCode)
  } catch {}
}

export function takePendingInviteCode() {
  try {
    const inviteCode = sessionStorage.getItem(PENDING_INVITE_KEY)
    sessionStorage.removeItem(PENDING_INVITE_KEY)
    return isValidInviteCode(inviteCode) ? inviteCode : null
  } catch {
    return null
  }
}
