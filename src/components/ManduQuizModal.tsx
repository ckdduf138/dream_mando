import { useEffect, useState } from 'react'
import Modal from '@components/Modal'
import { studentQuestions, workerQuestions, calculateManduType, manduResults } from '@utils/manduData'
import QuizCategoryScreen from '@components/quiz/QuizCategoryScreen'
import QuizQuestionScreen from '@components/quiz/QuizQuestionScreen'
import QuizResultView from '@components/quiz/QuizResultView'
import { buildManduQuizStorage, saveManduQuizToStorage } from '@utils/manduQuizStorage'

interface ManduQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ManduQuizModal({ isOpen, onClose }: ManduQuizModalProps) {
  const [category, setCategory] = useState<'student' | 'worker' | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'student' | 'worker' | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const questions = category === 'worker' ? workerQuestions : studentQuestions

  const commitAnswer = (answer: string) => {
    const nextAnswers = [...answers]
    nextAnswers[step] = answer
    setAnswers(nextAnswers)
    setSelectedChoice(null)
    return nextAnswers
  }

  useEffect(() => {
    if (!showResult) return
    if (!category) return
    const payload = buildManduQuizStorage(category, answers, questions)
    saveManduQuizToStorage(payload)
  }, [showResult, category, answers])

  const handlePrevious = () => {
    if (category && step === 0 && !showResult) {
      // Go back to category selection screen.
      setCategory(null)
      setSelectedCategory(category)
      setStep(0)
      setAnswers([])
      setSelectedChoice(null)
      setShowResult(false)
      return
    }

    if (step > 0) {
      const nextStep = step - 1
      setStep(nextStep)
      setSelectedChoice(answers[nextStep] || null)
    }
  }

  const handleChoiceClick = (choice: string) => {
    if (selectedChoice === choice) {
      const nextAnswers = commitAnswer(choice)

      if (step < questions.length - 1) {
        const nextStep = step + 1
        setStep(nextStep)
        setSelectedChoice(nextAnswers[nextStep] || null)
        return
      }

      // Final confirm: show result.
      setShowResult(true)
      return
    }

    setSelectedChoice(choice)
  }

  const handleReset = () => {
    setCategory(null)
    setSelectedCategory(null)
    setStep(0)
    setAnswers([])
    setShowResult(false)
    setSelectedChoice(null)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const currentQuestion = questions[step]
  const currentChoices = [currentQuestion?.a1, currentQuestion?.a2].filter(
    (value): value is string => Boolean(value)
  )
  const result = showResult ? manduResults[calculateManduType(answers, questions)] : null
  const previousAnswer = answers[step]
  const isLastStep = step === questions.length - 1
  const isNoChoiceStep = currentChoices.length === 0

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" scrollable={false}>
      <div className="relative">
        {/* 귀여운 만두 데코 (메인 톤과 연결) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <img
            src="/mandu.png"
            alt=""
            className="absolute -top-4 -left-4 sm:top-18 sm:-left-4 w-20 h-20 object-contain rotate-36"
          />
          <img
            src="/mandu.png"
            alt=""
            className="absolute top-20 right-2 sm:top-20 sm:right-4 w-20 h-20 object-contain rotate-12"
          />
          <img
            src="/mandu.png"
            alt=""
            className="absolute -bottom-14 -left-14 sm:-bottom-16 sm:-left-16 w-28 h-28 object-contain -rotate-12"
          />
        </div>

        {!showResult ? (
          <div className="relative">
            {category ? (
              <QuizQuestionScreen
                step={step}
                total={questions.length}
                question={currentQuestion.q}
                choices={currentChoices}
                selectedChoice={selectedChoice}
                previousAnswer={previousAnswer}
                onBack={handlePrevious}
                onClose={handleClose}
                onChoiceClick={handleChoiceClick}
                backEnabled={step > 0 || Boolean(category)}
                primaryActionLabel={isLastStep && isNoChoiceStep ? '결과 보기' : undefined}
                onPrimaryAction={
                  isLastStep && isNoChoiceStep
                    ? () => {
                        setShowResult(true)
                      }
                    : undefined
                }
              />
            ) : (
              <QuizCategoryScreen
                selectedCategory={selectedCategory}
                onClose={handleClose}
                onCategoryClick={(nextCategory) => {
                  if (selectedCategory === nextCategory) {
                    setCategory(nextCategory)
                    setStep(0)
                    setAnswers([])
                    setShowResult(false)
                    setSelectedChoice(null)
                    return
                  }
                  setSelectedCategory(nextCategory)
                }}
              />
            )}
          </div>
        ) : (
          result && (
            <div className="relative">
              <QuizResultView
                result={result}
                onReset={handleReset}
                onClose={handleClose}
                onShare={() => window.open('https://instagram.com/dreaming_mandu', '_blank')}
              />
            </div>
          )
        )}
      </div>
    </Modal>
  )
}
