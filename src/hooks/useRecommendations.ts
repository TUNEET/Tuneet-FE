import { useCallback, useEffect, useState } from 'react'
import { getApiError } from '@/apis/error'
import {
  getRecommendations,
  LOCATION_HIDDEN_CODE,
  LOCATION_NOT_AGREED_CODE,
  refreshRecommendations,
} from '@/apis/recommendation'
import type { TasteMatch } from '@/types/match'
import { getCurrentPosition } from '@/utils/geolocation'
import { useToast } from './useToast'

// notAgreed: 위치정보 수집·이용 미동의, hidden: 위치 노출 OFF
export type LocationBlock = 'notAgreed' | 'hidden'

export type RecommendationState =
  | { status: 'loading' }
  | { status: 'done'; users: TasteMatch[] }
  | { status: 'locationRequired'; block: LocationBlock }
  | { status: 'error' }

// 앱을 켠 뒤 한 번은 현재 위치로 새로 받고, 그 뒤에는 마지막 추천을 그대로 보여준다
let hasRefreshedThisSession = false

const toErrorState = (error: unknown): RecommendationState => {
  const { code } = getApiError(error)
  if (code === LOCATION_NOT_AGREED_CODE) return { status: 'locationRequired', block: 'notAgreed' }
  if (code === LOCATION_HIDDEN_CODE) return { status: 'locationRequired', block: 'hidden' }
  return { status: 'error' }
}

async function refreshWithCurrentPosition() {
  const users = (await refreshRecommendations(await getCurrentPosition())).users
  hasRefreshedThisSession = true
  return users
}

export function useRecommendations() {
  const showToast = useToast()
  const [state, setState] = useState<RecommendationState>({ status: 'loading' })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let isStale = false

    const load = async () => {
      if (!hasRefreshedThisSession) {
        try {
          return await refreshWithCurrentPosition()
        } catch (error) {
          // 위치 권한이 없거나 위치를 못 받으면 마지막 추천이라도 보여준다
          if (error instanceof GeolocationPositionError || !getApiError(error).code) {
            return (await getRecommendations()).users
          }
          throw error
        }
      }
      return (await getRecommendations()).users
    }

    load()
      .then((users) => {
        if (!isStale) setState({ status: 'done', users })
      })
      .catch((error) => {
        if (!isStale) setState(toErrorState(error))
      })

    return () => {
      isStale = true
    }
  }, [])

  // 새로고침: 현재 위치로 다시 뽑는다
  const refresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    try {
      setState({ status: 'done', users: await refreshWithCurrentPosition() })
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        showToast('위치 권한을 허용해야 새로 추천받을 수 있어요')
        return
      }
      const next = toErrorState(error)
      if (next.status === 'error') showToast(getApiError(error).message)
      else setState(next)
    } finally {
      setIsRefreshing(false)
    }
  }, [isRefreshing, showToast])

  return { state, refresh, isRefreshing }
}
