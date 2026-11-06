const INVITE_LINK_PATTERN = /tuneet\.com\/invite\/([A-Za-z0-9_-]+)/

export function parseInviteCode(text: string) {
  return text.match(INVITE_LINK_PATTERN)?.[1] ?? null
}
