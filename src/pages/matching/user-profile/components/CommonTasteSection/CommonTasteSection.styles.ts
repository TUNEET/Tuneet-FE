import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lavender};
  }
`

export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Row = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const ImageChip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const GenreChip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  height: 3rem;
  padding: 0 1.2rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`

export const ImageFallback = styled.span`
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.border};
`

export const Empty = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
