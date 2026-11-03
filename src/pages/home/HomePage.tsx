import styled from 'styled-components'

export function HomePage() {
  return <Title>TUNEET</Title>
}

const Title = styled.h1`
  padding: 4rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.primary};
`
