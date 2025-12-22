import QuizTopBar from '@components/quiz/QuizTopBar'
import QuizChoiceButton from '@components/quiz/QuizChoiceButton'
import { useState } from 'react'

interface QuizQuestionScreenProps {
  step: number
  total: number
  question: string
  choices: string[]
  selectedChoice: string | null
  previousAnswer?: string
  onBack: () => void
  onClose: () => void
  onChoiceClick: (choice: string) => void
  backEnabled?: boolean
  primaryActionLabel?: string
  onPrimaryAction?: () => void
}

export default function QuizQuestionScreen({
  step,
  total,
  question,
  choices,
  selectedChoice,
  previousAnswer,
  onBack,
  onClose,
  onChoiceClick,
  backEnabled,
  primaryActionLabel,
  onPrimaryAction
}: QuizQuestionScreenProps) {
  const [isChoiceAreaFocused, setIsChoiceAreaFocused] = useState(false)
  const shouldShowPrevious = !isChoiceAreaFocused && selectedChoice === null

  return (
    <>
      <QuizTopBar
        step={step}
        total={total}
        onBack={onBack}
        onClose={onClose}
        backEnabled={backEnabled}
      />

      <div className="pt-5 [@media(max-height:740px)]:pt-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-relaxed">{question}</h3>

        {choices.length > 0 ? (
          <div
            className="mt-4 space-y-3"
            onFocusCapture={() => setIsChoiceAreaFocused(true)}
            onBlurCapture={(e) => {
              const nextTarget = e.relatedTarget as Node | null
              if (nextTarget && e.currentTarget.contains(nextTarget)) return
              setIsChoiceAreaFocused(false)
            }}
          >
            {choices.map((choice) => (
              <QuizChoiceButton
                key={choice}
                text={choice}
                onClick={() => onChoiceClick(choice)}
                isSelected={selectedChoice === choice}
                isPreviouslySelected={shouldShowPrevious && previousAnswer === choice}
              />
            ))}
          </div>
        ) : primaryActionLabel && onPrimaryAction ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-2xl font-bold rounded-xl transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-sm"
            >
              {primaryActionLabel}
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}
