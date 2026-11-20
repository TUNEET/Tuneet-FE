import { useState } from 'react'
import { Modal } from '@/components/common/Modal/Modal'
import type { FeedComment } from '@/types/notification'
import { FeedCommentsCard } from '../FeedCommentsCard/FeedCommentsCard'
import { FeedDetailModal } from '../FeedDetailModal/FeedDetailModal'

type ReplyThreadModalProps = {
  replyId: number
  onClose: () => void
}

/**
 * 받은 답장 알림을 누르면 원래 코멘트와 주고받은 답장을 대댓글로 보여 준다.
 * 그 안의 코멘트·답장을 누르면 상세가 뜨고, 닫으면 다시 대화로 돌아온다
 */
export function ReplyThreadModal({ replyId, onClose }: ReplyThreadModalProps) {
  const [opened, setOpened] = useState<FeedComment | null>(null)

  if (opened) {
    return (
      <FeedDetailModal
        feed={{
          id: replyId,
          nickname: opened.nickname,
          song: opened.song,
          content: opened.message,
          createdAt: opened.createdAt,
        }}
        commentable={false}
        onClose={() => setOpened(null)}
      />
    )
  }

  return (
    <Modal open onClose={onClose} labelledBy="feed-comments-title">
      <FeedCommentsCard replyId={replyId} onSelect={setOpened} />
    </Modal>
  )
}
