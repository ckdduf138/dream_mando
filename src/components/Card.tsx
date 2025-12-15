import { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ title, subtitle, children, className = '', hover = false }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 ${hover ? 'hover:border-neutral-200 hover:shadow-sm transition-all duration-200' : ''} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-500">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
