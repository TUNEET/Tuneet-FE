import type { ReactNode } from 'react'
import * as S from './Chip.styles'
import type { ChipVariant } from './Chip.styles'

type ChipProps = {
  variant?: ChipVariant
  children: ReactNode
}

export function Chip({ variant = 'filled', children }: ChipProps) {
  return <S.Chip $variant={variant}>{children}</S.Chip>
}
