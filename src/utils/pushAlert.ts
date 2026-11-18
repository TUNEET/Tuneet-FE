import type { MessagePayload } from 'firebase/messaging'
import { getReceivedLetters } from '@/apis/letter'
import { getReceivedFeedMessages } from '@/apis/notification'

export type PushAlertKind = 'comment' | 'letter' | 'reply'

export type PushAlert = {
  kind: PushAlertKind
  title: string
  confirmLabel: string
  nickname?: string
  createdAt: string
  /** 앱 안에서 이동할 경로 (/explore/feeds/1 등) */
  path: string | null
}

const COPY: Record<PushAlertKind, { title: string; confirmLabel: string }> = {
  comment: { title: '내 피드에 코멘트가 도착했어요!', confirmLabel: '편지함에서 확인하기' },
  letter: { title: '편지가 도착했어요!', confirmLabel: '편지함에서 확인하기' },
  reply: { title: '내 편지에 답장이 도착했어요!', confirmLabel: '편지함에서 확인하기' },
}

const LETTER_PATH = /^\/matching\/letters\/(\d+)/

/**
 * 링크는 운영 도메인 전체 주소로 와서 경로만 꺼내 쓴다.
 * 그래야 로컬·미리보기 배포에서도 지금 열린 앱 안에서 이동한다
 */
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
  ...COPY[kind],
  nickname: detail.nickname,
  createdAt: detail.createdAt ?? new Date().toISOString(),
  path,
})

/**
 * 푸시 data에는 링크만 와서, 보낸 사람·시간·답장 여부는 이미 있는 목록 API로 채운다.
 * 편지 상세 API는 읽음 처리가 될 수 있어 목록에서 찾는다. 못 채우면 링크만으로 띄운다
 */
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

    // 방금 도착한 코멘트라 가장 최근 코멘트 알림이 그 코멘트다.
    // 목록에 편지 알림이 섞여 걸러지므로 몇 개 넉넉히 받는다
    const { items } = await getReceivedFeedMessages(undefined, 5)
    const latest = items[0]
    return createAlert('comment', path, {
      nickname: latest?.senderNickname,
      createdAt: latest?.createdAt,
    })
  } catch {
    return createAlert(letterId ? 'letter' : 'comment', path)
  }
}
