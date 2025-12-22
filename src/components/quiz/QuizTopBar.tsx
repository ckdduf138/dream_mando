interface QuizTopBarProps {
  step: number
  total: number
  onBack: () => void
  onClose: () => void
  backEnabled?: boolean
}

export default function QuizTopBar({
  step,
  total,
  onBack,
  onClose,
  backEnabled
}: QuizTopBarProps) {
  const backDisabled = backEnabled !== undefined ? !backEnabled : step <= 0
  const percent = total > 0 ? ((step + 1) / total) * 100 : 0
  const knobPercent = Math.min(96, Math.max(4, percent))

  return (
    <div className="sticky top-0 -mt-2 -mx-5 sm:-mx-8 [@media(max-height:740px)]:-mx-4 px-5 sm:px-8 [@media(max-height:740px)]:px-4 pt-2">
      <div className="relative flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          disabled={backDisabled}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            backDisabled
              ? 'text-neutral-300 cursor-not-allowed'
              : 'text-neutral-700 [@media(hover:hover)]:hover:bg-neutral-100'
          }`}
          aria-label="이전"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-neutral-900">
          {step + 1} / {total}
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full [@media(hover:hover)]:hover:bg-neutral-100 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-3 [@media(max-height:740px)]:mt-2">
        <div className="relative h-7">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-[width] duration-1200 ease-out rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div
            className="mandu-knob absolute top-1/2 w-7 h-7 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center transition-[left] duration-1200 ease-out"
            style={{ left: `${knobPercent}%` }}
            aria-hidden
          >
            <img src="/mandu.png" alt="" className="w-5 h-5 object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
