import { Button } from '@/components/common/Button/Button'
import { parseInviteCode } from '@/utils/invite'
import { Question } from '../Question/Question'
import * as S from './LinkJoinSection.styles'

type LinkJoinSectionProps = {
  link: string
  isEntering: boolean
  onLinkChange: (link: string) => void
  onJoin: (inviteCode: string) => void
}

export function LinkJoinSection({ link, isEntering, onLinkChange, onJoin }: LinkJoinSectionProps) {
  const inviteCode = parseInviteCode(link)

  return (
    <S.Wrapper>
      <Question>
        방 초대 <strong>링크</strong>를 받으셨나요?
      </Question>
      <S.LinkInput
        type="url"
        inputMode="url"
        value={link}
        placeholder="링크를 여기에 붙여넣어 주세요."
        aria-label="방 초대 링크"
        onChange={(event) => onLinkChange(event.target.value)}
      />
      <S.Actions>
        <Button
          disabled={!inviteCode || isEntering}
          onClick={() => inviteCode && onJoin(inviteCode)}
        >
          입장하기
        </Button>
      </S.Actions>
    </S.Wrapper>
  )
}
