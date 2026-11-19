const INVITE_LINK_PATTERN = /\/invite\/([A-Za-z0-9_-]+)/
const INVITE_CODE_PATTERN = /^[A-Za-z0-9_-]+$/

export function parseInviteCode(text: string) {
  return text.match(INVITE_LINK_PATTERN)?.[1] ?? null
}

export function isValidInviteCode(code: string | null | undefined): code is string {
  return !!code && INVITE_CODE_PATTERN.test(code)
}

export function getInviteUrl(inviteCode: string) {
  return `${window.location.origin}/invite/${inviteCode}`
}
