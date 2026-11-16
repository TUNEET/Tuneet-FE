import { useId, useState } from 'react'
import characterFailure from '@/assets/images/character-failure.webp'
import { Modal } from '@/components/common/Modal/Modal'
import { TermDetailModal } from '@/components/common/TermDetailModal/TermDetailModal'
import { TERMS } from '@/constants/terms'
import * as S from './LocationRequiredModal.styles'

const LOCATION_TERM = TERMS.find(({ id }) => id === 'locationConsent')

type LocationRequiredModalProps = {
  // 이미 위치정보 수집·이용에 동의했는지
  isAgreed: boolean
  isSubmitting: boolean
  // agreeNow: 모달에서 동의를 새로 체크했는지
  onGoSettings: (agreeNow: boolean) => void
  onLater: () => void
}

// 위치 동의 없이 가입했거나 위치 노출을 꺼 둔 사용자가 추천 사용자를 보려 할 때 띄운다
export function LocationRequiredModal({
  isAgreed,
  isSubmitting,
  onGoSettings,
  onLater,
}: LocationRequiredModalProps) {
  const titleId = useId()
  const [isChecked, setIsChecked] = useState(isAgreed)
  const [isTermOpen, setIsTermOpen] = useState(false)

  return (
    <>
      <Modal open onClose={onLater} labelledBy={titleId} showCloseButton={false}>
        <S.CardArea>
          <S.Character src={characterFailure} alt="" />
          <S.Card>
            <S.Body>
              <S.Intro>
                <S.Title id={titleId}>위치 서비스 사용이 필요해요.</S.Title>
                <S.Description>
                  {'사용자 추천 서비스는 위치 서비스 이용 동의 및\n위치 노출 설정 시에만 가능해요.'}
                </S.Description>
              </S.Intro>
              <S.Steps>
                <li>
                  위치 서비스 이용 약관에 동의해 주세요.
                  <S.Term>
                    <S.TermLabel>
                      <S.Checkbox
                        type="checkbox"
                        checked={isChecked}
                        aria-readonly={isAgreed}
                        onChange={(event) => {
                          if (!isAgreed) setIsChecked(event.target.checked)
                        }}
                      />
                      {LOCATION_TERM?.label}
                    </S.TermLabel>
                    <S.TermDetail type="button" onClick={() => setIsTermOpen(true)}>
                      자세히보기
                    </S.TermDetail>
                  </S.Term>
                </li>
                <li>설정에서 위치 노출을 ON으로 변경해 주세요.</li>
              </S.Steps>
            </S.Body>
            <S.Actions>
              <S.PrimaryButton
                type="button"
                disabled={isSubmitting}
                onClick={() => onGoSettings(!isAgreed && isChecked)}
              >
                설정으로 이동
              </S.PrimaryButton>
              <S.LaterButton type="button" onClick={onLater}>
                나중에 하기
              </S.LaterButton>
            </S.Actions>
          </S.Card>
        </S.CardArea>
      </Modal>
      {isTermOpen && LOCATION_TERM && (
        <TermDetailModal detail={LOCATION_TERM.detail} onClose={() => setIsTermOpen(false)} />
      )}
    </>
  )
}
