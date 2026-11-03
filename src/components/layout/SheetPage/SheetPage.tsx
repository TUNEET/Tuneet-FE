import type { ReactNode } from 'react'
import * as S from './SheetPage.styles'

type SheetPageProps = {
  children: ReactNode
}

export function SheetPage({ children }: SheetPageProps) {
  return (
    <S.Page>
      <S.Sheet>{children}</S.Sheet>
    </S.Page>
  )
}
