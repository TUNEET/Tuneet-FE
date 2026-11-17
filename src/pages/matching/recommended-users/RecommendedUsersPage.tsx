import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { getSettings, updateSettings } from '@/apis/user'
import { RecommendationList } from '@/components/common/RecommendationList/RecommendationList'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterWritePath, getUserProfilePath, ROUTES } from '@/constants/routes'
import { useRecommendations } from '@/hooks/useRecommendations'
import { useToast } from '@/hooks/useToast'
import type { MyPageLocationState } from '@/types/user'
import { LocationRequiredModal } from './components/LocationRequiredModal/LocationRequiredModal'

export function RecommendedUsersPage() {
  const navigate = useNavigate()
  const { key } = useLocation()
  const showToast = useToast()
  const { state, refresh, isRefreshing } = useRecommendations()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goBack = () => {
    if (key !== 'default') navigate(-1)
    else navigate(ROUTES.matching, { replace: true })
  }

  const goSettings = async (agreeNow: boolean) => {
    if (isSubmitting) return

    // 모달에서 위치 동의를 체크했으면 먼저 저장하고 이동한다
    if (agreeNow) {
      setIsSubmitting(true)
      try {
        const settings = await getSettings()
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
      <SectionHeader
        title="매칭 | 나와 음악 취향이 닮은 사람들"
        actionLabel="새로고침"
        onActionClick={refresh}
        actionDisabled={isRefreshing}
      />
      <RecommendationList
        state={state}
        onUserClick={(match) => navigate(getUserProfilePath(match.id))}
        onLetterClick={(match) => navigate(getLetterWritePath(match.id))}
      />

      {state.status === 'locationRequired' && (
        <LocationRequiredModal
          isAgreed={state.block === 'hidden'}
          isSubmitting={isSubmitting}
          onGoSettings={goSettings}
          onLater={goBack}
        />
      )}
    </SheetPage>
  )
}
