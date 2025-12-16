interface QuizChoiceButtonProps {
  text: string
  isSelected: boolean
  isPreviouslySelected: boolean
  onClick: () => void
}

export default function QuizChoiceButton({
  text,
  isSelected,
  isPreviouslySelected,
  onClick
}: QuizChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-4 [@media(max-height:740px)]:py-3 text-left rounded-xl border-2 transition-all text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
        isSelected
          ? 'border-primary-600 bg-white text-neutral-900'
          : isPreviouslySelected
          ? 'border-primary-200 bg-primary-50'
          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
      }`}
    >
      {text}
    </button>
  )
}
