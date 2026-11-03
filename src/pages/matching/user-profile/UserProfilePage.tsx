import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Divider } from '@/components/common/Divider/Divider'
import { ProfileCard } from '@/components/common/ProfileCard/ProfileCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { MOCK_LETTER_QUOTA, MOCK_USER_PROFILE } from '@/mocks/data'
import { formatDistance } from '@/utils/format'
import { CommonTasteSection } from './components/CommonTasteSection/CommonTasteSection'
import * as S from './UserProfilePage.styles'

export function UserProfilePage() {
  const navigate = useNavigate()
  const user = MOCK_USER_PROFILE
  const canSendLetter = MOCK_LETTER_QUOTA.remaining > 0

  const [isBlockOpen, setIsBlockOpen] = useState(false)
  const blockButtonRef = useRef<HTMLButtonElement>(null)
  const closeBlock = useCallback(() => setIsBlockOpen(false), [])

  const handleBlock = () => {
    closeBlock()
  }

  return (
    <SheetPage>
      <SectionHeader title="프로필" actionLabel="나가기" onActionClick={() => navigate(-1)} />

      <ProfileCard
        profile={user}
        tone="purple"
        meta={`${user.similarity}% / ${formatDistance(user.distanceKm)}`}
      />

      <S.Actions>
        <Button
          ref={blockButtonRef}
          variant="outline"
          aria-expanded={isBlockOpen}
          onClick={() => setIsBlockOpen((prev) => !prev)}
        >
          차단하기
        </Button>
        <Button disabled={!canSendLetter}>편지 쓰기</Button>
        <ConfirmPopover
          open={isBlockOpen}
          message="이 사용자를 차단하시겠어요?"
          confirmLabel="사용자 차단"
          onConfirm={handleBlock}
          onClose={closeBlock}
          anchorRef={blockButtonRef}
        />
      </S.Actions>

      <Divider />

      <CommonTasteSection nickname={user.nickname} commonTaste={user.commonTaste} />
    </SheetPage>
  )
}
