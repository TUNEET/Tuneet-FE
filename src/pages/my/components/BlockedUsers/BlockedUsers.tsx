import { useCallback, useRef, useState } from 'react'
import blockIcon from '@/assets/icons/block.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MOCK_BLOCKED_USERS } from '@/mocks/data'
import * as S from './BlockedUsers.styles'

type BlockedUser = (typeof MOCK_BLOCKED_USERS)[number]

type BlockedUserRowProps = {
  user: BlockedUser
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
        <img src={blockIcon} alt="" width={20} height={20} />
      </S.Avatar>
      <S.Info>
        <S.Nickname>{user.nickname}</S.Nickname>
        <S.BlockedDate>{user.blockedDate} 차단</S.BlockedDate>
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
  const [users, setUsers] = useState(MOCK_BLOCKED_USERS)
  const [confirmUserId, setConfirmUserId] = useState<number | null>(null)
  const closeConfirm = useCallback(() => setConfirmUserId(null), [])

  const unblockUser = (id: number) => {
    closeConfirm()
    setUsers((current) => current.filter((user) => user.id !== id))
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
        <S.List>
          {users.map((user) => (
            <BlockedUserRow
              key={user.id}
              user={user}
              isConfirmOpen={confirmUserId === user.id}
              onToggleConfirm={() =>
                setConfirmUserId((current) => (current === user.id ? null : user.id))
              }
              onCloseConfirm={closeConfirm}
              onUnblock={() => unblockUser(user.id)}
            />
          ))}
        </S.List>
      </S.Section>
    </S.BlockedSheet>
  )
}
