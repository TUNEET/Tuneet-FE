import styled from 'styled-components'

/* 로그인·회원가입·프로필 설정 등 인증 흐름 화면이 함께 쓰는 스타일 */

/** 디자인 기준 top 값에 화면 높이 차이(--diff)의 ratio만큼을 더한다. */
export const shiftTop = (top: string, ratio: number) => `calc(${top} + var(--diff) * ${ratio})`

/**
 * 디자인 기준 높이(85.2rem)와 실제 화면 높이의 차이.
 * 화면이 작으면 음수, 크면 양수이며 --max-shrink 이상으로는 줄어들지 않는다.
 * 페이지마다 --max-shrink로 최대 축소량을 정하고, 아래쪽 요소는 `shiftTop`으로 이 차이의 일부만큼 위치를 옮겨 화면 높이에 맞춘다.
 */
export const Page = styled.div`
  --max-shrink: 0rem;
  --diff: max(calc(var(--frame-height) - 85.2rem), calc(var(--max-shrink) * -1));

  position: relative;
  min-height: calc(90.1rem + var(--diff));
  margin-top: -4.9rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Blob = styled.div`
  position: absolute;
  top: calc(100% - 8.7rem);
  left: -10.2rem;
  width: 61.7rem;
  height: 61.3rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 800px 800px 800px;
  filter: blur(400px);
`

export const Heading = styled.h1`
  position: absolute;
  top: 16rem;
  left: 3rem;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 800;
  line-height: 4rem;
  letter-spacing: 0.06rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Logo = styled.img`
  position: absolute;
  top: 12rem;
  left: 3rem;
  width: 11.3rem;
  height: 2rem;
`

export const Description = styled.p`
  position: absolute;
  top: 24.6rem;
  left: 3rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 400;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.7rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};

  &::placeholder {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textPlaceholder};
  }

  &:-webkit-autofill {
    box-shadow: inset 0 0 0 5rem ${({ theme }) => theme.colors.border};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textHeading};
  }
`
