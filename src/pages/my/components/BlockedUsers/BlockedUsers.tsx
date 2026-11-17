import { useCallback, useEffect, useRef, useState } from 'react'
import { getApiError } from '@/apis/error'
import { getBlockedUsers, unblockUser } from '@/apis/user'
import blockIcon from '@/assets/icons/block.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { useToast } from '@/hooks/useToast'
import type { BlockedUserResponse } from '@/types/user'
import { formatDate } from '@/utils/format'
import * as S from './BlockedUsers.styles'

type BlockedUserRowProps = {
  user: BlockedUserResponse
  isConfirmOpen: boolean
  onToggleConfirm: () => void
  onCloseConfirm: () => void
  onUnblock: () => void
}

function BlockedUserRow({
  user,
  isConfirmOpen,
  onToggleConfirm,
  onCloseConfirm,
  onUnblock,
}: BlockedUserRowProps) {
  const unblockButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <S.Row>
      <S.Avatar aria-hidden>
        {user.profilePicture && <S.Photo src={user.profilePicture} />}
        <S.BlockIcon src={blockIcon} alt="" width={20} height={20} />
      </S.Avatar>
      <S.Info>
        <S.Nickname>{user.nickname}</S.Nickname>
        <S.BlockedDate>{formatDate(user.blockedAt)} 차단</S.BlockedDate>
      </S.Info>
      <S.UnblockButton
        ref={unblockButtonRef}
        type="button"
        aria-expanded={isConfirmOpen}
        onClick={onToggleConfirm}
      >
        차단 해제
      </S.UnblockButton>
      <ConfirmPopover
        open={isConfirmOpen}
        message="차단을 해제하시겠어요?"
        confirmLabel="차단 해제"
        onConfirm={onUnblock}
        onClose={onCloseConfirm}
        anchorRef={unblockButtonRef}
        surface="sheet"
        tone="default"
      />
    </S.Row>
  )
}

type BlockedUsersProps = {
  onExit: () => void
}

export function BlockedUsers({ onExit }: BlockedUsersProps) {
  const showToast = useToast()
  const [users, setUsers] = useState<BlockedUserResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [confirmUserId, setConfirmUserId] = useState<number | null>(null)
  const closeConfirm = useCallback(() => setConfirmUserId(null), [])

  useEffect(() => {
    let isStale = false

    getBlockedUsers()
      .then((data) => {
        if (!isStale) setUsers(data)
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })
      .finally(() => {
        if (!isStale) setIsLoading(false)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  const handleUnblock = async (userId: number) => {
    closeConfirm()
    try {
      await unblockUser(userId)
      setUsers((current) => current.filter((user) => user.userId !== userId))
      showToast('차단을 해제했어요')
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

  return (
    <S.BlockedSheet>
      <S.Section>
        <S.Header>
          <S.Title>차단한 사용자</S.Title>
          <S.ExitButton type="button" onClick={onExit}>
            나가기
          </S.ExitButton>
        </S.Header>
        {users.length > 0 ? (
          <S.List>
            {users.map((user) => (
              <BlockedUserRow
                key={user.userId}
                user={user}
                isConfirmOpen={confirmUserId === user.userId}
                onToggleConfirm={() =>
                  setConfirmUserId((current) => (current === user.userId ? null : user.userId))
                }
                onCloseConfirm={closeConfirm}
                onUnblock={() => handleUnblock(user.userId)}
              />
            ))}
          </S.List>
        ) : (
          !isLoading && <S.Empty>차단한 사용자가 없어요</S.Empty>
        )}
      </S.Section>
    </S.BlockedSheet>
  )
}
