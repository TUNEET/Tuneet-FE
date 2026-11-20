import type { MessagePayload } from 'firebase/messaging'
import { getReceivedLetters } from '@/apis/letter'
import { getReceivedFeedMessages } from '@/apis/notification'

export type PushAlertKind = 'comment' | 'letter' | 'reply' | 'commentReply'

export type PushAlert = {
  kind: PushAlertKind
  title: string
  confirmLabel: string
  nickname?: string
  createdAt: string
  path: string | null
}

export const ALERT_COPY: Record<PushAlertKind, { title: string; confirmLabel: string }> = {
  comment: { title: '내 피드에 코멘트가 도착했어요!', confirmLabel: '지금 확인하기' },
  letter: { title: '편지가 도착했어요!', confirmLabel: '지금 확인하기' },
  reply: { title: '내 편지에 답장이 도착했어요!', confirmLabel: '지금 확인하기' },
  commentReply: { title: '내 코멘트에 답장이 도착했어요!', confirmLabel: '지금 확인하기' },
}

export const isFeedAlertKind = (kind: PushAlertKind) =>
  kind === 'comment' || kind === 'commentReply'

const LETTER_PATH = /^\/matching\/letters\/(\d+)/

export function toAppPath(link: string | undefined) {
  if (!link) return null
  try {
    const { pathname, search, hash } = new URL(link, window.location.origin)
    return `${pathname}${search}${hash}`
  } catch {
    return null
  }
}

const createAlert = (
  kind: PushAlertKind,
  path: string | null,
  detail: { nickname?: string; createdAt?: string } = {},
): PushAlert => ({
  kind,
  ...ALERT_COPY[kind],
  nickname: detail.nickname,
  createdAt: detail.createdAt ?? new Date().toISOString(),
  path,
})

export async function toPushAlert({ data = {} }: MessagePayload): Promise<PushAlert> {
  const path = toAppPath(data.link)
  const letterId = Number(path?.match(LETTER_PATH)?.[1])

  try {
    if (letterId) {
      const { letters } = await getReceivedLetters(undefined, 5)
      const letter = letters.find((item) => item.letterId === letterId)
      if (!letter) return createAlert('letter', path)
      return createAlert(letter.isReply ? 'reply' : 'letter', path, {
        nickname: letter.senderNickname,
        createdAt: letter.createdAt,
      })
    }

    const { items } = await getReceivedFeedMessages(undefined, 5)
    const latest = items[0]
    return createAlert(latest?.kind === 'reply' ? 'commentReply' : 'comment', path, {
      nickname: latest?.senderNickname,
      createdAt: latest?.createdAt,
    })
  } catch {
    return createAlert(letterId ? 'letter' : 'comment', path)
  }
}
