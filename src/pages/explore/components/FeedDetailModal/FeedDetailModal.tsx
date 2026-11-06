import { useRef, useState } from 'react'
import appleMusicIcon from '@/assets/icons/Apple_Music.svg'
import deleteIcon from '@/assets/icons/del-icon.svg'
import editIcon from '@/assets/icons/edit-icon.svg'
import feedIcon from '@/assets/icons/feed-icon.svg'
import genieIcon from '@/assets/icons/genie.svg'
import melonIcon from '@/assets/icons/melon.svg'
import characterImage from '@/assets/icons/tunee5.svg'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Modal } from '@/components/common/Modal/Modal'
import type { Feed } from '@/types/feed'
import { formatTimeAgo } from '@/utils/format'
import { FeedCommentCard } from '../FeedCommentCard/FeedCommentCard'
import * as S from './FeedDetailModal.styles'

const PLATFORMS = [
  { id: 'youtubeMusic', label: '유튜브 뮤직에서 듣기', icon: appleMusicIcon },
  { id: 'melon', label: '멜론에서 듣기', icon: melonIcon },
  { id: 'genie', label: '지니 뮤직에서 듣기', icon: genieIcon },
]

type FeedDetailModalProps = {
  feed: Feed
  isMine?: boolean
  onEdit?: () => void
  onClose: () => void
}

export function FeedDetailModal({ feed, isMine = false, onEdit, onClose }: FeedDetailModalProps) {
  const { nickname, song, content, createdAt } = feed
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const closeDelete = () => setIsDeleteOpen(false)

  if (isCommenting) {
    return (
      <Modal open onClose={onClose} labelledBy="feed-comment-title">
        <FeedCommentCard />
      </Modal>
    )
  }

  return (
    <Modal open onClose={onClose} labelledBy="feed-detail-title">
      <S.Card>
        <S.Character src={characterImage} alt="" />
        <S.Top>
          <S.Author>
            <S.AuthorIcon>
              <img src={userBlueIcon} alt="" width={14} height={14} />
            </S.AuthorIcon>
            <S.AuthorName>{nickname}</S.AuthorName>
          </S.Author>
          <S.Time>{formatTimeAgo(createdAt)}</S.Time>
        </S.Top>

        <S.Album src={song.albumImageUrl} alt="" />
        <S.SongTitle id="feed-detail-title">{song.title}</S.SongTitle>
        <S.Artist>{song.artist}</S.Artist>
        {content && <S.Comment>{content}</S.Comment>}

        <S.Listen>
          <S.ListenLabel>지금 들어보기</S.ListenLabel>
          <S.Platforms>
            {PLATFORMS.map(({ id, label, icon }) => (
              <S.PlatformButton key={id} type="button" aria-label={label}>
                <img src={icon} alt="" />
              </S.PlatformButton>
            ))}
          </S.Platforms>
        </S.Listen>

        <S.Divider />
        <S.Actions>
          {isMine ? (
            <>
              <S.ActionButton type="button" aria-label="수정" onClick={onEdit}>
                <img src={editIcon} alt="" width={16} height={16} />
              </S.ActionButton>
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
            <S.ActionButton type="button" aria-label="코멘트" onClick={() => setIsCommenting(true)}>
              <img src={feedIcon} alt="" width={26} height={26} />
            </S.ActionButton>
          )}
        </S.Actions>
        <ConfirmPopover
          open={isDeleteOpen}
          message="게시물을 삭제하시겠어요?"
          confirmLabel="게시물 삭제"
          onConfirm={closeDelete}
          onClose={closeDelete}
          anchorRef={deleteButtonRef}
          surface="dim"
        />
      </S.Card>
    </Modal>
  )
}
