const INVITE_LINK_PATTERN = /tuneet\.com\/invite\/([A-Za-z0-9_-]+)/

export function parseInviteCode(text: string) {
  return text.match(INVITE_LINK_PATTERN)?.[1] ?? null
}

// 초대 링크는 백엔드 명세대로 tuneet.com/invite/{inviteCode}로 조합한다
export function getInviteUrl(inviteCode: string) {
  return `https://tuneet.com/invite/${inviteCode}`
}
