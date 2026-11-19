import type { ChangeEvent } from 'react'
import qrScanIcon from '@/assets/icons/qr-scan.svg'
import { Button } from '@/components/common/Button/Button'
import { Question } from '../Question/Question'
import * as S from './QrJoinSection.styles'

type QrJoinSectionProps = {
  inviteCode: string | null
  isEntering: boolean
  onImageSelect: (file: File) => void
  onJoin: (inviteCode: string) => void
}

export function QrJoinSection({
  inviteCode,
  isEntering,
  onImageSelect,
  onJoin,
}: QrJoinSectionProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImageSelect(file)
    event.target.value = ''
  }

  return (
    <S.Wrapper>
      <Question>
        방 초대 <strong>QR코드</strong>를 받으셨나요?
      </Question>
      <S.Row>
        <S.ScanPicker $scanned={!!inviteCode} aria-label="QR 코드 사진 선택">
          <img src={qrScanIcon} alt="" />
          <S.FileInput type="file" accept="image/*" onChange={handleFileChange} />
        </S.ScanPicker>
        <Button
          disabled={!inviteCode || isEntering}
          onClick={() => inviteCode && onJoin(inviteCode)}
        >
          입장하기
        </Button>
      </S.Row>
    </S.Wrapper>
  )
}
