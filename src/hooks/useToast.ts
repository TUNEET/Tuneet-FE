import { useContext } from 'react'
import { ToastContext } from '@/components/common/Toast/toastContext'

export function useToast() {
  return useContext(ToastContext)
}
