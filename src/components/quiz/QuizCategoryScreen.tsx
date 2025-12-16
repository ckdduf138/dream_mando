interface QuizCategoryScreenProps {
  selectedCategory: 'student' | 'worker' | null
  onCategoryClick: (category: 'student' | 'worker') => void
  onClose: () => void
}

export default function QuizCategoryScreen({
  selectedCategory,
  onCategoryClick,
  onClose
}: QuizCategoryScreenProps) {
  const categories: Array<{ key: 'student' | 'worker'; label: string }> = [
    { key: 'student', label: '대학생' },
    { key: 'worker', label: '직장인' }
  ]

  return (
    <div className="py-2 [@media(max-height:740px)]:py-1">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-neutral-900">퀴즈 시작하기</div>
          <div className="text-lg text-neutral-600">먼저 카테고리를 골라줘</div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-5 [@media(max-height:740px)]:mt-4 grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => onCategoryClick(category.key)}
            className={`w-full px-5 py-4 [@media(max-height:740px)]:py-3 text-left rounded-2xl border-2 transition-colors ${
              selectedCategory === category.key
                ? 'border-primary-600 bg-primary-50'
                : 'border-primary-200 hover:bg-neutral-50'
            }`}
          >
            <div className="text-2xl font-bold text-neutral-900 text-center">{category.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
