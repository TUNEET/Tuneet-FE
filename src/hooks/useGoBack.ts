import { useCallback } from 'react'
import { useNavigate } from 'react-router'

const hasAppHistory = () => {
  const state = window.history.state as { idx?: number } | null
  return (state?.idx ?? 0) > 0
}

export function useGoBack(fallback: string) {
  const navigate = useNavigate()

  return useCallback(() => {
    if (hasAppHistory()) navigate(-1)
    else navigate(fallback, { replace: true })
  }, [navigate, fallback])
}
