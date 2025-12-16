import { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  scrollable?: boolean
}

export default function Modal({ isOpen, onClose, children, size = 'md', scrollable = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
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
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] backdrop-brightness-75 z-[9998]"
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
