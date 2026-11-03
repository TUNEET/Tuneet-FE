import { Button } from '@/components/common/Button/Button'
import type { LetterQuota } from '@/types/letter'
import * as S from './LetterSection.styles'

type LetterSectionProps = {
  quota: LetterQuota
  onWriteClick?: () => void
}

export function LetterSection({ quota, onWriteClick }: LetterSectionProps) {
  return (
    <S.Wrapper>
      <S.Info>
        <S.Title>편지 보내기</S.Title>
        <S.Remaining>
          오늘 남은 편지지 |{' '}
          <strong>
            {quota.remaining}/{quota.total}장
          </strong>
        </S.Remaining>
      </S.Info>
      <Button onClick={onWriteClick}>편지 쓰기</Button>
    </S.Wrapper>
  )
}
