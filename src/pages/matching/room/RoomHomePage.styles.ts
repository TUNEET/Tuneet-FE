import styled from 'styled-components'

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Empty = styled.p`
  padding: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const BottomActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -1rem;
`

export const LeaveArea = styled.div`
  position: relative;
`

export const LeaveButton = styled.button`
  padding: 0.6rem 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.danger};

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
