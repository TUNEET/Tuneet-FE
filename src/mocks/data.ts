const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_BLOCKED_USERS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  nickname: '산책하는 튜니',
  blockedDate: '2026. 11. 21',
}))

export const MOCK_INCOMING_COMMENT = {
  senderNickname: '노래하는 튜니',
  createdAt: minutesAgo(0),
}
