import characterQuestion from '@/assets/images/character-question.png'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import * as S from './ExceptionView.styles'

type ExceptionAction = {
  label: string
  onClick: () => void
  variant?: 'filled' | 'outline'
}

type ExceptionViewProps = {
  title: string
  description: string
  actions: ExceptionAction[]
  image?: string
}

export function ExceptionView({
  title,
  description,
  actions,
  image = characterQuestion,
}: ExceptionViewProps) {
  return (
    <SheetPage>
      <S.Content role="alert">
        <S.Character src={image} alt="" />
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Actions>
          {actions.map(({ label, onClick, variant = 'filled' }) => (
            <S.ActionButton key={label} type="button" $variant={variant} onClick={onClick}>
              {label}
            </S.ActionButton>
          ))}
        </S.Actions>
      </S.Content>
    </SheetPage>
  )
}
