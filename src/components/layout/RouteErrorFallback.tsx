import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router'
import styled from 'styled-components'
import { ROUTES } from '@/constants/routes'
import { isChunkLoadError, reloadOnceForChunkError } from '@/utils/chunkReload'

export function RouteErrorFallback() {
  const error = useRouteError()
  const navigate = useNavigate()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  useEffect(() => {
    if (isChunkLoadError(error)) reloadOnceForChunkError()
  }, [error])

  return (
    <Wrapper role="alert">
      <Title>{isNotFound ? '페이지를 찾을 수 없어요.' : '문제가 발생했어요.'}</Title>
      <Description>
        {isNotFound ? '주소를 다시 확인해 주세요.' : '잠시 후 다시 시도해 주세요.'}
      </Description>
      <Buttons>
        {!isNotFound && (
          <Button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        )}
        <Button type="button" $primary onClick={() => navigate(ROUTES.home, { replace: true })}>
          홈으로
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: var(--frame-height);
  padding: 0 3rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHeading};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textBody};
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.button<{ $primary?: boolean }>`
  height: 4rem;
  padding: 0 2rem;
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  outline: 1px solid ${({ theme }) => theme.colors.primary};
  outline-offset: -1px;
  background-color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $primary }) => ($primary ? theme.colors.surfaceWhite : theme.colors.primary)};
`
