import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

type ToastState = {
  open: boolean
  message: string
}

type ToastOptions = {
  durationMs?: number
}

type ToastContextValue = {
  showToast: (message: string, options?: ToastOptions) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = (): ToastContextValue => {
  const value = useContext(ToastContext)
  if (!value) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return value
}

export const useToastController = () => {
  const [toast, setToast] = useState<ToastState>({ open: false, message: '' })
  const timerRef = useRef<number | null>(null)

  const hideToast = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setToast((prev) => (prev.open ? { ...prev, open: false } : prev))
  }, [])

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const durationMs = options?.durationMs ?? 1600

      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }

      setToast({ open: true, message })
      timerRef.current = window.setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }))
        timerRef.current = null
      }, durationMs)
    },
    [],
  )

  const contextValue = useMemo<ToastContextValue>(() => ({ showToast, hideToast }), [showToast, hideToast])

  return { toast, contextValue }
}

export const ToastProvider = ({ value, children }: { value: ToastContextValue; children: React.ReactNode }) => (
  <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
)
