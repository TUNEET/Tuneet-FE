import { Link } from 'react-router'
import styled from 'styled-components'

export function NotFoundPage() {
  return (
    <Wrapper>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  min-height: var(--frame-height);
`
