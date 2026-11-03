import type { ComponentProps } from 'react'
import * as S from './Button.styles'
import type { ButtonVariant } from './Button.styles'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
}

export function Button({ variant = 'filled', type = 'button', ...props }: ButtonProps) {
  return <S.Button $variant={variant} type={type} {...props} />
}
