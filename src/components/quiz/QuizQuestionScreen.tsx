import QuizTopBar from '@components/quiz/QuizTopBar'
import QuizChoiceButton from '@components/quiz/QuizChoiceButton'

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
  backEnabled
}: QuizQuestionScreenProps) {
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

        <div className="mt-4 space-y-3">
          {choices.map((choice) => (
            <QuizChoiceButton
              key={choice}
              text={choice}
              onClick={() => onChoiceClick(choice)}
              isSelected={selectedChoice === choice}
              isPreviouslySelected={previousAnswer === choice}
            />
          ))}
        </div>
      </div>
    </>
  )
}
