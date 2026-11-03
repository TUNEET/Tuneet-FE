const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function formatTimeAgo(date: string, now = Date.now()) {
  const diff = now - new Date(date).getTime()

  if (diff < MINUTE) return '방금 전'
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}분 전`
  if (diff < DAY) return `${Math.floor(diff / HOUR)}시간 전`
  if (diff < 2 * DAY) return '어제'
  if (diff < 7 * DAY) return `${Math.floor(diff / DAY)}일 전`

  const target = new Date(date)
  return `${target.getMonth() + 1}월 ${target.getDate()}일`
}

export function formatDistance(km: number) {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${Number(km.toFixed(1))}km`
}
