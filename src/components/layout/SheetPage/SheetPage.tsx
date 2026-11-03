import type { ReactNode } from 'react'
import * as S from './SheetPage.styles'
import type { SheetTone } from './SheetPage.styles'

type SheetPageProps = {
  tone?: SheetTone
  children: ReactNode
}

export function SheetPage({ tone = 'default', children }: SheetPageProps) {
  return (
    <S.Page>
      <S.Sheet $tone={tone}>{children}</S.Sheet>
    </S.Page>
  )
}
