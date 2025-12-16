interface QuizResult {
  title: string
  description: string
  traits: string[]
}

interface QuizResultViewProps {
  result: QuizResult
  onReset: () => void
  onClose: () => void
  onShare: () => void
}

export default function QuizResultView({
  result,
  onReset,
  onClose,
  onShare
}: QuizResultViewProps) {
  return (
    <div className="relative text-center space-y-5 py-6 sm:py-8 [@media(max-height:740px)]:py-4 [@media(max-height:740px)]:space-y-4">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
        aria-label="닫기"
      >
        <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="space-y-4">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 mandu-pop">
          <img src="/mandu.png" alt="만두 캐릭터" className="w-full h-full object-contain" />
        </div>

        <div className="result-seq result-seq-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{result.title}</h3>
          <p className="text-neutral-600 text-sm sm:text-lg">{result.description}</p>
        </div>

        <div className="result-seq result-seq-2 flex flex-wrap justify-center gap-2 pt-3">
          {result.traits.map((trait) => (
            <span key={trait} className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium">
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div className="result-seq result-seq-3 space-y-3 pt-5 [@media(max-height:740px)]:pt-4 border-t border-neutral-100">
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 px-6 py-2.5 bg-primary-100 text-primary-900 font-semibold rounded-xl hover:bg-primary-200 transition-all"
          >
            다시 하기
          </button>
          <button
            onClick={onShare}
            className="flex-1 px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  )
}
