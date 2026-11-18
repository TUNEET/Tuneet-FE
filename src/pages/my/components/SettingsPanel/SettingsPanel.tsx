import { useCallback, useEffect, useRef, useState } from 'react'
import { getApiError } from '@/apis/error'
import { unlinkYoutubeMusic } from '@/apis/platform'
import { updateSettings } from '@/apis/user'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { TermDetailModal } from '@/components/common/TermDetailModal/TermDetailModal'
import { TERMS } from '@/constants/terms'
import { useToast } from '@/hooks/useToast'
import { disablePush, enablePush, isPushEnabled } from '@/utils/push'
import {
  clearConnectResult,
  peekConnectResult,
  startYoutubeMusicConnect,
} from '@/utils/youtubeMusic'
import type { PushBlockedReason } from '../PushPermissionModal/PushPermissionModal'
import { PushPermissionModal } from '../PushPermissionModal/PushPermissionModal'
import { toSettings } from './settings'
import type { Settings } from './settings'
import * as S from './SettingsPanel.styles'

type ToggleKey = 'locationVisible' | 'pushEnabled' | 'letterEnabled' | 'platformLinked'

const TOGGLES: {
  key: ToggleKey
  label: string
  description: string
  offDescription?: string
  offNotice?: string
}[] = [
  {
    key: 'locationVisible',
    label: '위치정보 노출',
    description: 'OFF로 설정하면 주변 사용자를 추천받을 수 없어요.',
    offNotice: '내 위치를 표시하지 않아요.',
  },
  {
    key: 'pushEnabled',
    label: 'PUSH 알림 수신',
    description: '코멘트, 편지 알림을 받아요. (브라우저 알림 권한 필요)',
    offNotice: '알림을 받을 수 없어요.',
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
  const showToast = useToast()
  const [draft, setDraft] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [saveResult, setSaveResult] = useState<SaveResult | null>(null)
  const [openTermId, setOpenTermId] = useState<string | null>(null)
  const [offNoticeKey, setOffNoticeKey] = useState<ToggleKey | null>(null)
  const [isPushOn, setIsPushOn] = useState(isPushEnabled)
  const [isPushPending, setIsPushPending] = useState(false)
  const [pushBlockedReason, setPushBlockedReason] = useState<PushBlockedReason | null>(null)
  const [isPlatformPending, setIsPlatformPending] = useState(false)
  const [isUnlinkOpen, setIsUnlinkOpen] = useState(false)
  const closeUnlink = useCallback(() => setIsUnlinkOpen(false), [])
  const toggleRefs = {
    locationVisible: useRef<HTMLButtonElement>(null),
    pushEnabled: useRef<HTMLButtonElement>(null),
    letterEnabled: useRef<HTMLButtonElement>(null),
    platformLinked: useRef<HTMLButtonElement>(null),
  }
  const closeOffNotice = useCallback(() => setOffNoticeKey(null), [])
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const closeSaveResult = useCallback(() => setSaveResult(null), [])
  const openTermDetail = TERMS.find(({ id }) => id === openTermId)?.detail

  useEffect(() => {
    const result = peekConnectResult('settings')
    if (!result) return
    clearConnectResult()
    showToast(
      result.status === 'success' ? '유튜브 뮤직을 연결했어요' : '유튜브 뮤직 연결에 실패했어요',
    )
  }, [showToast])

  const handlePlatformConnect = async () => {
    if (isPlatformPending) return
    setIsPlatformPending(true)
    try {
      await startYoutubeMusicConnect('settings')
    } catch (error) {
      showToast(getApiError(error).message)
      setIsPlatformPending(false)
    }
  }

  const handlePlatformUnlink = async () => {
    if (isPlatformPending) return
    closeUnlink()
    setIsPlatformPending(true)
    try {
      await unlinkYoutubeMusic()
      setDraft((current) => ({ ...current, platformLinked: false }))
      showToast('유튜브 뮤직 연동을 해제했어요')
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsPlatformPending(false)
    }
  }

  const handlePushToggle = async () => {
    if (isPushPending) return
    setIsPushPending(true)
    try {
      if (isPushOn) {
        await disablePush()
        setIsPushOn(false)
        setOffNoticeKey('pushEnabled')
      } else {
        const result = await enablePush()
        if (result === 'enabled') setIsPushOn(true)
        else setPushBlockedReason(result)
      }
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsPushPending(false)
    }
  }

  const handleSave = async () => {
    if (isSaving) return
    if (TERMS.some(({ id, required }) => required && !draft.terms[id])) {
      setSaveResult('termsRequired')
      return
    }

    setIsSaving(true)
    try {
      const saved = toSettings(
        await updateSettings({
          locationVisible: draft.locationVisible,
          letterReceivable: draft.letterEnabled,
          locationAgreed: draft.terms.locationConsent,
        }),
      )
      setDraft(saved)
      onSave(saved)
      setSaveResult('saved')
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsSaving(false)
    }
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
          const isPush = key === 'pushEnabled'
          const isPlatform = key === 'platformLinked'
          const isOn = isPush ? isPushOn : draft[key]

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
                  aria-busy={(isPush && isPushPending) || (isPlatform && isPlatformPending)}
                  $isOn={isOn}
                  onClick={() => {
                    if (isPush) {
                      void handlePushToggle()
                      return
                    }
                    if (isPlatform) {
                      if (isOn) setIsUnlinkOpen((open) => !open)
                      else void handlePlatformConnect()
                      return
                    }
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
              {isPlatform && (
                <ConfirmPopover
                  open={isUnlinkOpen}
                  message="연동을 해제하면 불러온 좋아요가 삭제돼요."
                  confirmLabel="연동 해제"
                  onConfirm={handlePlatformUnlink}
                  onClose={closeUnlink}
                  anchorRef={toggleRefs.platformLinked}
                  surface="sheet"
                />
              )}
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
          confirmLabel="확인"
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

      {pushBlockedReason && (
        <PushPermissionModal
          reason={pushBlockedReason}
          onClose={() => setPushBlockedReason(null)}
        />
      )}

      {openTermDetail && (
        <TermDetailModal detail={openTermDetail} onClose={() => setOpenTermId(null)} />
      )}
    </S.SettingsSheet>
  )
}
