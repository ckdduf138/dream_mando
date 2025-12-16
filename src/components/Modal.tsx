import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  scrollable?: boolean
}

export default function Modal({ isOpen, onClose, children, size = 'md', scrollable = true }: ModalProps) {
  const scrollYRef = useRef(0)
  const previousBodyStyleRef = useRef<{
    overflow: string
    position: string
    top: string
    left: string
    right: string
    width: string
  } | null>(null)
  const previousHtmlOverflowRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      // noop; actual cleanup happens in the effect below
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      // Restore when closing.
      const previous = previousBodyStyleRef.current
      if (previous) {
        document.body.style.overflow = previous.overflow
        document.body.style.position = previous.position
        document.body.style.top = previous.top
        document.body.style.left = previous.left
        document.body.style.right = previous.right
        document.body.style.width = previous.width
        previousBodyStyleRef.current = null
      } else {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
      }

      if (previousHtmlOverflowRef.current !== null) {
        document.documentElement.style.overflow = previousHtmlOverflowRef.current
        previousHtmlOverflowRef.current = null
      } else {
        document.documentElement.style.overflow = ''
      }

      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current)
        scrollYRef.current = 0
      }

      return
    }

    // Lock scroll when opening (more reliable on iOS Safari than overflow:hidden alone).
    scrollYRef.current = window.scrollY || window.pageYOffset || 0

    previousBodyStyleRef.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width
    }
    previousHtmlOverflowRef.current = document.documentElement.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollYRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      // Restore styles & scroll position.
      const previous = previousBodyStyleRef.current
      if (previous) {
        document.body.style.overflow = previous.overflow
        document.body.style.position = previous.position
        document.body.style.top = previous.top
        document.body.style.left = previous.left
        document.body.style.right = previous.right
        document.body.style.width = previous.width
        previousBodyStyleRef.current = null
      } else {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
      }

      if (previousHtmlOverflowRef.current !== null) {
        document.documentElement.style.overflow = previousHtmlOverflowRef.current
        previousHtmlOverflowRef.current = null
      } else {
        document.documentElement.style.overflow = ''
      }

      const y = scrollYRef.current
      scrollYRef.current = 0
      window.scrollTo(0, y)
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[9998]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className={`dm-modal relative bg-white rounded-3xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] font-[OngleipParkDahyeon] text-2xl ${
            scrollable ? 'overflow-y-auto' : 'overflow-hidden'
          } animate-slide-up`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 sm:p-8 [@media(max-height:740px)]:p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
