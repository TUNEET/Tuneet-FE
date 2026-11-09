import { useState } from 'react'
import appleMusicIcon from '@/assets/icons/Apple_Music.svg'
import genieIcon from '@/assets/icons/genie.svg'
import melonIcon from '@/assets/icons/melon.svg'
import characterSleeping from '@/assets/images/character-sleeping.webp'
import characterFailure from '@/assets/images/character-failure.webp'
import characterImage from '@/assets/images/character-profile.png'
import { MOCK_FAILING_PLATFORM_ID } from '@/pages/profile-setup/mocks'
import * as S from './PlatformConnect.styles'

const PLATFORMS = [
  { id: 'youtubeMusic', label: '유튜브 뮤직 연결하기', icon: appleMusicIcon },
  { id: 'melon', label: '멜론 연결하기', icon: melonIcon },
  { id: 'genie', label: '지니 뮤직 연결하기', icon: genieIcon },
]

type PlatformConnectProps = {
  nickname: string
  previewUrl: string | null
  music: { title: string; artist: string; albumImage: string } | null
  onNext: () => void
}

export function PlatformConnect({ nickname, previewUrl, music, onNext }: PlatformConnectProps) {
  const [connectResult, setConnectResult] = useState<'success' | 'failure' | null>(null)

  return (
    <>
      <S.Card>
        <S.Avatar>
          {previewUrl ? (
            <S.AvatarPreview src={previewUrl} alt="" />
          ) : (
            <S.AvatarCharacter src={characterImage} alt="" />
          )}
        </S.Avatar>
        <S.Info>
          <S.Nickname>{nickname}</S.Nickname>
          {music && (
            <S.MusicChip>
              <img src={music.albumImage} alt="" width={14} height={14} />
              <span>
                {music.title} - {music.artist}
              </span>
            </S.MusicChip>
          )}
        </S.Info>
      </S.Card>

      <S.Platforms>
        {PLATFORMS.map(({ id, label, icon }) => (
          <S.PlatformButton
            key={id}
            type="button"
            onClick={() =>
              setConnectResult(id === MOCK_FAILING_PLATFORM_ID ? 'failure' : 'success')
            }
          >
            <S.PlatformIcon>
              <img src={icon} alt="" width={20} height={20} />
            </S.PlatformIcon>
            <S.PlatformLabel>{label}</S.PlatformLabel>
          </S.PlatformButton>
        ))}
      </S.Platforms>

      <S.SleepingCharacter src={characterSleeping} alt="" />

      {connectResult === 'failure' && (
        <S.Overlay>
          <S.FailurePopup
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-connect-failure"
          >
            <S.PopupTexts>
              <S.PopupTitle id="platform-connect-failure">연결에 실패했어요.</S.PopupTitle>
              <S.PopupDescription>
                다시 시도하거나 직접 입력해 프로필을 생성해 보세요.
              </S.PopupDescription>
            </S.PopupTexts>
            <S.FailureButtons>
              <S.RetryButton type="button" onClick={() => setConnectResult('success')}>
                다시 연결하기
              </S.RetryButton>
              <S.ManualButton type="button" onClick={onNext} autoFocus>
                직접 입력하기
              </S.ManualButton>
            </S.FailureButtons>
            <S.FailureCharacter src={characterFailure} alt="" />
          </S.FailurePopup>
        </S.Overlay>
      )}

      {connectResult === 'success' && (
        <S.Overlay>
          <S.SuccessPopup
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-connect-success"
          >
            <S.PopupTexts>
              <S.PopupTitle id="platform-connect-success">성공적으로 연결되었어요!</S.PopupTitle>
              <S.PopupDescription>나의 음악 취향을 TUNEET에서 만나 보세요.</S.PopupDescription>
            </S.PopupTexts>
            <S.SuccessButton type="button" aria-label="다음" onClick={onNext} autoFocus>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                <path d="m1 1 6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </S.SuccessButton>
          </S.SuccessPopup>
        </S.Overlay>
      )}
    </>
  )
}
