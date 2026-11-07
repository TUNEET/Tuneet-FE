import { useCallback, useRef, useState } from 'react'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { TermDetailModal } from '@/pages/signup/components/TermDetailModal/TermDetailModal'
import { TERMS } from '@/pages/signup/terms'
import type { Settings } from './settings'
import * as S from './SettingsPanel.styles'

type ToggleKey = 'locationVisible' | 'letterEnabled' | 'platformLinked'

const TOGGLES: { key: ToggleKey; label: string; description: string }[] = [
  {
    key: 'locationVisible',
    label: '위치정보 노출',
    description: 'OFF로 설정하면 주변 사용자를 추천받을 수 없어요.',
  },
  {
    key: 'letterEnabled',
    label: '편지 받기',
    description: 'OFF로 설정하면 다른 사용자에게 편지를 받을 수 없어요.',
  },
  {
    key: 'platformLinked',
    label: '음원 플랫폼 연동',
    description: '현재 연동되어 있습니다.',
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
        {TOGGLES.map(({ key, label, description }) => {
          const isOn = draft[key]

          return (
            <S.Option key={key}>
              <S.OptionHeader>
                <S.Title>{label}</S.Title>
                <S.Toggle
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  aria-label={label}
                  $isOn={isOn}
                  onClick={() => setDraft((current) => ({ ...current, [key]: !isOn }))}
                >
                  <span>{isOn ? 'ON' : 'OFF'}</span>
                  <S.ToggleKnob />
                </S.Toggle>
              </S.OptionHeader>
              <S.OptionDescription>{description}</S.OptionDescription>
            </S.Option>
          )
        })}

        <S.Terms>
          {TERMS.map(({ id, label }) => (
            <S.Term key={id}>
              <S.TermLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={draft.terms[id]}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      terms: { ...current.terms, [id]: event.target.checked },
                    }))
                  }
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
