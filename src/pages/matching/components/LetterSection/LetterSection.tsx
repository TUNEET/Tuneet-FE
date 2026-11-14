import { Button } from '@/components/common/Button/Button'
import type { LetterQuota } from '@/types/letter'
import * as S from './LetterSection.styles'

type LetterSectionProps = {
  /** 불러오는 중이면 null */
  quota: LetterQuota | null
  onWriteClick?: () => void
}

export function LetterSection({ quota, onWriteClick }: LetterSectionProps) {
  const isExhausted = quota !== null && quota.remaining <= 0

  return (
    <S.Wrapper>
      <S.Info>
        <S.Title>편지 보내기</S.Title>
        <S.Remaining>
          오늘 남은 편지지 |{' '}
          <S.Count $exhausted={isExhausted}>
            {quota ? `${quota.remaining}/${quota.limit}장` : '-'}
          </S.Count>
        </S.Remaining>
      </S.Info>
      <Button disabled={quota === null || isExhausted} onClick={onWriteClick}>
        편지 쓰기
      </Button>
    </S.Wrapper>
  )
}
