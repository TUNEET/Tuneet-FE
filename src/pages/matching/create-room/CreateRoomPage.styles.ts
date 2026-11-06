import styled from 'styled-components'
import { Divider as BaseDivider } from '@/components/common/Divider/Divider'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Divider = styled(BaseDivider)`
  margin-top: 1.2rem;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`
