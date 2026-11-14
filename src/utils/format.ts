import type { DistanceRange } from '@/types/user'

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

const pad = (value: number) => String(value).padStart(2, '0')

export function formatDateTime(date: string) {
  const target = new Date(date)
  const ymd = `${target.getFullYear()}. ${pad(target.getMonth() + 1)}. ${pad(target.getDate())}`
  return `${ymd} ${pad(target.getHours())}시 ${pad(target.getMinutes())}분`
}

/** 2026년 11월 21일 12시 07분 */
export function formatKoreanDateTime(date: string) {
  const target = new Date(date)
  const ymd = `${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일`
  return `${ymd} ${pad(target.getHours())}시 ${pad(target.getMinutes())}분`
}

export function formatDistance(km: number) {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${Number(km.toFixed(1))}km`
}

const DISTANCE_RANGE_LABELS: Record<DistanceRange, string> = {
  WITHIN_1KM: '1km 이내',
  WITHIN_3KM: '3km 이내',
  WITHIN_5KM: '5km 이내',
  OVER_5KM: '5km 이상',
}

export function formatDistanceRange(range: DistanceRange) {
  return DISTANCE_RANGE_LABELS[range]
}
