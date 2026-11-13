import styled from 'styled-components'

/** 작은 캡슐 라벨 (예: 편지 '답장') */
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.05rem 0.6rem;
  border-radius: 0.8rem;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: 0.016rem;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.letterBadge};
  color: ${({ theme }) => theme.colors.letterBadgeText};
`
