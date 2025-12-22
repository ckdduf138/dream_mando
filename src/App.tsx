import ReactDOM from 'react-dom/client'
import { useEffect, useLayoutEffect, useState } from 'react'
import HomePage from '@pages/HomePage'
import './index.css'
import { areFontsReady, loadFonts } from '@/fontLoader'
import { FontStatusProvider } from '@hooks/useFontsReady'
import Toast from '@components/Toast'
import { ToastProvider, useToastController } from '@hooks/useToast'

const MAX_WAIT_MS = 8000

const App = () => {
  const [fontReady, setFontReady] = useState<boolean>(() => areFontsReady())
  const [showText, setShowText] = useState<boolean>(() => areFontsReady())
  const { toast, contextValue } = useToastController()

  useLayoutEffect(() => {
    if (areFontsReady()) {
      setFontReady(true)
      setShowText(true)
    }
  }, [])

  useEffect(() => {
    if (showText) return

    let cancelled = false

    const timer = window.setTimeout(() => {
      if (!cancelled) setShowText(true)
    }, MAX_WAIT_MS)

    loadFonts().then((ok) => {
      if (cancelled) return
      if (ok) setFontReady(true)
      setShowText(true)
    })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [showText])

  return (
    <FontStatusProvider value={{ showText, fontReady }}>
      <ToastProvider value={contextValue}>
        <HomePage />
        <Toast open={toast.open} message={toast.message} />
      </ToastProvider>
    </FontStatusProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
