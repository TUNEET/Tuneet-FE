import { useNavigate } from 'react-router'
import { ExceptionView } from '@/components/common/ExceptionView/ExceptionView'
import { NOT_FOUND_TEXT } from '@/constants/exception'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <ExceptionView
      {...NOT_FOUND_TEXT}
      actions={[{ label: '홈으로 이동', onClick: () => navigate(ROUTES.home, { replace: true }) }]}
    />
  )
}
