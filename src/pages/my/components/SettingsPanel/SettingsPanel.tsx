import { useCallback, useRef, useState } from 'react'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { TermDetailModal } from '@/components/common/TermDetailModal/TermDetailModal'
import { TERMS } from '@/constants/terms'
import type { Settings } from './settings'
import * as S from './SettingsPanel.styles'

type ToggleKey = 'locationVisible' | 'letterEnabled' | 'platformLinked'

const TOGGLES: {
  key: ToggleKey
  label: string
  description: string
  offDescription?: string
  /** OFF로 바꿀 때 띄우는 안내 */
  offNotice?: string
}[] = [
  {
    key: 'locationVisible',
    label: '위치정보 노출',
    description: 'OFF로 설정하면 주변 사용자를 추천받을 수 없어요.',
    offNotice: '내 위치를 표시하지 않아요.',
  },
  {
    key: 'letterEnabled',
    label: '편지 받기',
    description: 'OFF로 설정하면 다른 사용자에게 편지를 받을 수 없어요.',
    offNotice: '편지를 받을 수 없어요.',
  },
  {
    key: 'platformLinked',
    label: '음원 플랫폼 연동',
    description: '현재 연동되어 있습니다.',
    offDescription: '현재 연동 해제 상태입니다.',
  },
]

type SaveResult = 'saved' | 'termsRequired'

type SettingsPanelProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onExit: () => void
}

export function SettingsPanel({ settings, onSave, onExit }: SettingsPanelProps) {
  const [draft, setDraft] = useState(settings)
  const [saveResult, setSaveResult] = useState<SaveResult | null>(null)
  const [openTermId, setOpenTermId] = useState<string | null>(null)
  const [offNoticeKey, setOffNoticeKey] = useState<ToggleKey | null>(null)
  const toggleRefs = {
    locationVisible: useRef<HTMLButtonElement>(null),
    letterEnabled: useRef<HTMLButtonElement>(null),
    platformLinked: useRef<HTMLButtonElement>(null),
  }
  const closeOffNotice = useCallback(() => setOffNoticeKey(null), [])
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const closeSaveResult = useCallback(() => setSaveResult(null), [])
  const openTermDetail = TERMS.find(({ id }) => id === openTermId)?.detail

  const handleSave = () => {
    if (TERMS.some(({ id, required }) => required && !draft.terms[id])) {
      setSaveResult('termsRequired')
      return
    }

    onSave(draft)
    setSaveResult('saved')
  }

  return (
    <S.SettingsSheet>
      <S.Header>
        <S.Title>설정</S.Title>
        <S.ExitButton type="button" onClick={onExit}>
          나가기
        </S.ExitButton>
      </S.Header>

      <S.Options>
        {TOGGLES.map(({ key, label, description, offDescription, offNotice }) => {
          const isOn = draft[key]

          return (
            <S.Option key={key}>
              <S.OptionHeader>
                <S.Title>{label}</S.Title>
                <S.Toggle
                  ref={toggleRefs[key]}
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  aria-label={label}
                  $isOn={isOn}
                  onClick={() => {
                    setDraft((current) => ({ ...current, [key]: !isOn }))
                    setOffNoticeKey(isOn && offNotice ? key : null)
                  }}
                >
                  <span>{isOn ? 'ON' : 'OFF'}</span>
                  <S.ToggleKnob />
                </S.Toggle>
              </S.OptionHeader>
              <S.OptionDescription>
                {!isOn && offDescription ? offDescription : description}
              </S.OptionDescription>
              {offNotice && (
                <ConfirmPopover
                  open={offNoticeKey === key}
                  message={offNotice}
                  confirmLabel="닫기"
                  onConfirm={closeOffNotice}
                  onClose={closeOffNotice}
                  anchorRef={toggleRefs[key]}
                  surface="sheet"
                  tone="muted"
                />
              )}
            </S.Option>
          )
        })}

        <S.Terms>
          {TERMS.map(({ id, label, required }) => (
            <S.Term key={id}>
              <S.TermLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={draft.terms[id]}
                  aria-readonly={required}
                  onChange={(event) => {
                    const { checked } = event.target
                    // 필수 약관은 동의 해제 불가
                    if (required && !checked) return

                    setDraft((current) => ({
                      ...current,
                      terms: { ...current.terms, [id]: checked },
                    }))
                  }}
                />
                {label}
              </S.TermLabel>
              <S.TermDetail type="button" onClick={() => setOpenTermId(id)}>
                자세히보기
              </S.TermDetail>
            </S.Term>
          ))}
        </S.Terms>
      </S.Options>

      <S.SaveArea>
        <S.SaveButton ref={saveButtonRef} type="button" onClick={handleSave}>
          저장하기
        </S.SaveButton>
        <ConfirmPopover
          open={saveResult === 'saved'}
          message="수정사항이 저장되었습니다."
          confirmLabel="내 프로필로 이동"
          onConfirm={onExit}
          onClose={closeSaveResult}
          anchorRef={saveButtonRef}
          surface="sheet"
          placement="top"
          tone="default"
        />
        <ConfirmPopover
          open={saveResult === 'termsRequired'}
          message="필수 약관에 동의해 주세요."
          confirmLabel="닫기"
          onConfirm={closeSaveResult}
          onClose={closeSaveResult}
          anchorRef={saveButtonRef}
          surface="sheet"
          placement="top"
          tone="muted"
        />
      </S.SaveArea>

      {openTermDetail && (
        <TermDetailModal detail={openTermDetail} onClose={() => setOpenTermId(null)} />
      )}
    </S.SettingsSheet>
  )
}
