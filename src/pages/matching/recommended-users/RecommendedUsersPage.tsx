import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { getSettings, updateSettings } from '@/apis/user'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { TasteMatchCard } from '@/components/common/TasteMatchCard/TasteMatchCard'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { MAX_RECOMMENDED_USERS } from '@/constants/matching'
import { getLetterWritePath, getUserProfilePath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { MOCK_RECOMMENDED_USERS } from '@/mocks/data'
import type { MyPageLocationState, SettingsResponse } from '@/types/user'
import { LocationRequiredModal } from './components/LocationRequiredModal/LocationRequiredModal'
import * as S from './RecommendedUsersPage.styles'

// 위치정보 수집·이용 동의와 위치 노출이 모두 켜져 있어야 추천을 받을 수 있다
const canUseLocation = ({ locationAgreed, locationVisible }: SettingsResponse) =>
  locationAgreed && locationVisible

export function RecommendedUsersPage() {
  const navigate = useNavigate()
  const { key } = useLocation()
  const showToast = useToast()
  const [settings, setSettings] = useState<SettingsResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const users = MOCK_RECOMMENDED_USERS.slice(0, MAX_RECOMMENDED_USERS)

  useEffect(() => {
    let isStale = false

    getSettings()
      .then((data) => {
        if (!isStale) setSettings(data)
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  const goBack = () => {
    if (key !== 'default') navigate(-1)
    else navigate(ROUTES.matching, { replace: true })
  }

  const goSettings = async (agreeNow: boolean) => {
    if (!settings || isSubmitting) return

    // 모달에서 위치 동의를 체크했으면 먼저 저장하고 이동한다
    if (agreeNow) {
      setIsSubmitting(true)
      try {
        await updateSettings({
          locationVisible: settings.locationVisible,
          letterReceivable: settings.letterReceivable,
          locationAgreed: true,
        })
      } catch (error) {
        showToast(getApiError(error).message)
        setIsSubmitting(false)
        return
      }
    }

    navigate(ROUTES.my, { state: { view: 'settings' } satisfies MyPageLocationState })
  }

  return (
    <SheetPage>
      <SectionHeader title="매칭 | 나와 음악 취향이 닮은 사람들" actionLabel="새로고침" />
      <S.CardList>
        {users.map((user) => (
          <TasteMatchCard
            key={user.id}
            match={user}
            onClick={() => navigate(getUserProfilePath(user.id))}
            onLetterClick={() => navigate(getLetterWritePath(user.id))}
          />
        ))}
      </S.CardList>

      {settings && !canUseLocation(settings) && (
        <LocationRequiredModal
          isAgreed={settings.locationAgreed}
          isSubmitting={isSubmitting}
          onGoSettings={goSettings}
          onLater={goBack}
        />
      )}
    </SheetPage>
  )
}
