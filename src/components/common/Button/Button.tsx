import type { ComponentProps } from 'react'
import * as S from './Button.styles'
import type { ButtonTone, ButtonVariant } from './Button.styles'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  tone?: ButtonTone
}

export function Button({
  variant = 'filled',
  tone = 'lavender',
  type = 'button',
  ...props
}: ButtonProps) {
  return <S.Button $variant={variant} $tone={tone} type={type} {...props} />
}
