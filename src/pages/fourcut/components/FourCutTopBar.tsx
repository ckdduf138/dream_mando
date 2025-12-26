type Props = {
  title: string
  leftLabel: string
  onLeft: () => void
  rightSpacerWidthClass?: string
}

import { ChevronLeft } from 'lucide-react'

const FourCutTopBar = ({ title, leftLabel, onLeft, rightSpacerWidthClass = 'w-[76px]' }: Props) => {
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={onLeft}
          className="px-4 py-3 rounded-xl border border-neutral-200 text-neutral-800 hover:bg-neutral-50 active:scale-95 inline-flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          {leftLabel}
        </button>
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        <div className={rightSpacerWidthClass} />
      </div>
    </div>
  )
}

export default FourCutTopBar
