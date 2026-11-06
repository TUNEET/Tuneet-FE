import type { ReactNode } from 'react'
import * as S from './Chip.styles'
import type { ChipTone, ChipVariant } from './Chip.styles'

type ChipProps = {
  variant?: ChipVariant
  tone?: ChipTone
  children: ReactNode
}

export function Chip({ variant = 'filled', tone = 'pink', children }: ChipProps) {
  return (
    <S.Chip $variant={variant} $tone={tone}>
      {children}
    </S.Chip>
  )
}
