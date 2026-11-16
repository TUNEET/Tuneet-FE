import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router'
import { ExceptionView } from '@/components/common/ExceptionView/ExceptionView'
import { ERROR_TEXT, NOT_FOUND_TEXT } from '@/constants/exception'
import { ROUTES } from '@/constants/routes'
import { isChunkLoadError, reloadOnceForChunkError } from '@/utils/chunkReload'

export function RouteErrorFallback() {
  const error = useRouteError()
  const navigate = useNavigate()
  const goHome = () => navigate(ROUTES.home, { replace: true })

  useEffect(() => {
    if (isChunkLoadError(error)) reloadOnceForChunkError()
  }, [error])

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ExceptionView {...NOT_FOUND_TEXT} actions={[{ label: '홈으로 이동', onClick: goHome }]} />
    )
  }

  return (
    <ExceptionView
      {...ERROR_TEXT}
      actions={[
        { label: '다시 시도', onClick: () => window.location.reload() },
        { label: '홈으로 이동', onClick: goHome, variant: 'outline' },
      ]}
    />
  )
}
