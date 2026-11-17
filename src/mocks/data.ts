const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString()

export const MOCK_INCOMING_COMMENT = {
  senderNickname: '노래하는 튜니',
  createdAt: minutesAgo(0),
}
