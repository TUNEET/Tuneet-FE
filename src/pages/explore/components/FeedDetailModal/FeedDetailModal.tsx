import { useRef, useState } from 'react'
import youtubeMusicIcon from '@/assets/icons/youtube_Music.svg'
import deleteIcon from '@/assets/icons/del-icon.svg'
import editIcon from '@/assets/icons/edit-icon.svg'
import feedIcon from '@/assets/icons/feed-icon.svg'
import fullChatsIcon from '@/assets/icons/fullChats.svg'
import replyIcon from '@/assets/icons/repplyy.svg'
import characterImage from '@/assets/images/character-feed.webp'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Modal } from '@/components/common/Modal/Modal'
import type { Feed } from '@/types/feed'
import type { FeedComment, ReplyTarget } from '@/types/notification'
import { formatTimeAgo } from '@/utils/format'
import { getYoutubeMusicSearchUrl } from '@/utils/youtubeMusic'
import { FeedCommentCard } from '../FeedCommentCard/FeedCommentCard'
import { FeedCommentsCard } from '../FeedCommentsCard/FeedCommentsCard'
import * as S from './FeedDetailModal.styles'

type FeedDetailModalProps = {
  feed: Feed
  isMine?: boolean
  liked?: boolean
  onLikeToggle?: () => void
  onEdit?: () => void
  onDelete?: () => void | Promise<void>
  commentable?: boolean
  onAuthorClick?: () => void
  /** 넘기면 답장 아이콘이 생기고, 누르면 답장 작성 카드로 바뀐다 */
  replyTarget?: ReplyTarget
  /** 답장을 보낸 뒤 호출된다 */
  onReplied?: () => void
  /** reply: 처음부터 답장 작성 카드로 연다 */
  initialMode?: 'detail' | 'reply'
  /** 넘기면 코멘트 전체보기 아이콘이 생기고, 누르면 이 피드에 달린 코멘트를 모아 보여 준다 */
  commentsFeedId?: number
  onClose: () => void
}

export function FeedDetailModal({
  feed,
  isMine = false,
  liked = false,
  onLikeToggle,
  onEdit,
  onDelete,
  commentable = true,
  onAuthorClick,
  replyTarget,
  onReplied,
  initialMode = 'detail',
  commentsFeedId,
  onClose,
}: FeedDetailModalProps) {
  const { nickname, song, content, createdAt } = feed
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isViewingComments, setIsViewingComments] = useState(false)
  // 모아보기에서 누른 코멘트. 닫으면 다시 모아보기 목록으로 돌아간다
  const [openedComment, setOpenedComment] = useState<FeedComment | null>(null)
  const [isReplying, setIsReplying] = useState(initialMode === 'reply' && !!replyTarget)
  const [isDeleting, setIsDeleting] = useState(false)
  const closeDelete = () => setIsDeleteOpen(false)
  const hasActions = isMine || commentable || !!replyTarget || commentsFeedId !== undefined

  const handleDelete = async () => {
    closeDelete()
    if (!onDelete || isDeleting) return
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  if (isCommenting) {
    return (
      <Modal open onClose={onClose} labelledBy="feed-comment-title">
        <FeedCommentCard feedId={feed.id} onSent={onClose} />
      </Modal>
    )
  }

  if (isReplying && replyTarget) {
    return (
      <Modal open onClose={onClose} labelledBy="feed-comment-title">
        <FeedCommentCard
          feedId={feed.id}
          replyTarget={replyTarget}
          onSent={() => {
            onReplied?.()
            onClose()
          }}
        />
      </Modal>
    )
  }

  if (isViewingComments && commentsFeedId !== undefined) {
    if (openedComment) {
      return (
        <FeedDetailModal
          feed={{
            id: commentsFeedId,
            nickname: openedComment.nickname,
            song: openedComment.song,
            content: openedComment.message,
            createdAt: openedComment.createdAt,
          }}
          commentable={false}
          onClose={() => setOpenedComment(null)}
        />
      )
    }

    return (
      <Modal open onClose={onClose} labelledBy="feed-comments-title">
        <FeedCommentsCard feedId={commentsFeedId} onSelect={setOpenedComment} />
      </Modal>
    )
  }

  return (
    <Modal open onClose={onClose} labelledBy="feed-detail-title">
      <S.Card>
        <S.Character src={characterImage} alt="" />
        <S.Top>
          <S.Author
            as={onAuthorClick ? 'button' : 'div'}
            type={onAuthorClick ? 'button' : undefined}
            aria-label={onAuthorClick ? `${nickname} 프로필 보기` : undefined}
            onClick={onAuthorClick}
          >
            <S.AuthorIcon>
              <img src={userBlueIcon} alt="" width={14} height={14} />
            </S.AuthorIcon>
            <S.AuthorName>{nickname}</S.AuthorName>
          </S.Author>
          <S.Time>{formatTimeAgo(createdAt)}</S.Time>
        </S.Top>

        <S.AlbumWrap>
          <S.Album src={song.albumImageUrl} alt="" />
          {onLikeToggle && (
            <S.LikeButton
              type="button"
              aria-label={liked ? '좋아요 취소' : '좋아요'}
              aria-pressed={liked}
              onClick={onLikeToggle}
            >
              <HeartIcon filled={liked} size={12} />
            </S.LikeButton>
          )}
        </S.AlbumWrap>
        <S.SongTitle id="feed-detail-title">{song.title}</S.SongTitle>
        <S.Artist>{song.artist}</S.Artist>
        {content && <S.Comment>{content}</S.Comment>}

        <S.Listen>
          <S.ListenLabel>지금 들어보기</S.ListenLabel>
          <S.PlatformButton
            as="a"
            href={getYoutubeMusicSearchUrl(song.title, song.artist)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="유튜브 뮤직에서 듣기"
          >
            <img src={youtubeMusicIcon} alt="" />
          </S.PlatformButton>
        </S.Listen>

        {hasActions && (
          <>
            <S.Divider />
            <S.Actions>
              {isMine && onEdit ? (
                <S.ActionButton type="button" aria-label="수정" onClick={onEdit}>
                  <img src={editIcon} alt="" width={16} height={16} />
                </S.ActionButton>
              ) : (
                <span />
              )}
              <S.ActionGroup>
                {isMine && (
                  <S.ActionButton
                    ref={deleteButtonRef}
                    type="button"
                    aria-label="삭제"
                    aria-expanded={isDeleteOpen}
                    onClick={() => setIsDeleteOpen((isOpen) => !isOpen)}
                  >
                    <img src={deleteIcon} alt="" width={26} height={26} />
                  </S.ActionButton>
                )}
                {replyTarget && (
                  <S.ActionButton
                    type="button"
                    aria-label="답장"
                    onClick={() => setIsReplying(true)}
                  >
                    <img src={replyIcon} alt="" width={20} height={19} />
                  </S.ActionButton>
                )}
                {commentsFeedId !== undefined && (
                  <S.ActionButton
                    type="button"
                    aria-label="코멘트 전체보기"
                    onClick={() => setIsViewingComments(true)}
                  >
                    <img src={fullChatsIcon} alt="" width={26} height={26} />
                  </S.ActionButton>
                )}
                {!isMine && commentable && (
                  <S.ActionButton
                    type="button"
                    aria-label="코멘트"
                    onClick={() => setIsCommenting(true)}
                  >
                    <img src={feedIcon} alt="" width={26} height={26} />
                  </S.ActionButton>
                )}
              </S.ActionGroup>
            </S.Actions>
          </>
        )}
        <ConfirmPopover
          open={isDeleteOpen}
          message="게시물을 삭제하시겠어요?"
          confirmLabel="게시물 삭제"
          onConfirm={handleDelete}
          onClose={closeDelete}
          anchorRef={deleteButtonRef}
          surface="dim"
        />
      </S.Card>
    </Modal>
  )
}
