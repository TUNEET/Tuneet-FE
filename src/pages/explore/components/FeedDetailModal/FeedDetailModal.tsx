import { useRef, useState } from 'react'
import youtubeMusicIcon from '@/assets/icons/youtube_Music.svg'
import deleteIcon from '@/assets/icons/del-icon.svg'
import editIcon from '@/assets/icons/edit-icon.svg'
import feedIcon from '@/assets/icons/feed-icon.svg'
import characterImage from '@/assets/images/character-feed.webp'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Modal } from '@/components/common/Modal/Modal'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'
import { FeedCommentCard } from '../FeedCommentCard/FeedCommentCard'
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
  onClose,
}: FeedDetailModalProps) {
  const { nickname, song, content, createdAt } = feed
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const closeDelete = () => setIsDeleteOpen(false)
  const hasActions = isMine || commentable

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
          <S.PlatformButton type="button" aria-label="유튜브 뮤직에서 듣기">
            <img src={youtubeMusicIcon} alt="" />
          </S.PlatformButton>
        </S.Listen>

        {hasActions && (
          <>
            <S.Divider />
            <S.Actions>
              {isMine ? (
                <>
                  {onEdit && (
                    <S.ActionButton type="button" aria-label="수정" onClick={onEdit}>
                      <img src={editIcon} alt="" width={16} height={16} />
                    </S.ActionButton>
                  )}
                  <S.ActionButton
                    ref={deleteButtonRef}
                    type="button"
                    aria-label="삭제"
                    aria-expanded={isDeleteOpen}
                    onClick={() => setIsDeleteOpen((isOpen) => !isOpen)}
                  >
                    <img src={deleteIcon} alt="" width={26} height={26} />
                  </S.ActionButton>
                </>
              ) : (
                commentable && (
                  <S.ActionButton
                    type="button"
                    aria-label="코멘트"
                    onClick={() => setIsCommenting(true)}
                  >
                    <img src={feedIcon} alt="" width={26} height={26} />
                  </S.ActionButton>
                )
              )}
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
