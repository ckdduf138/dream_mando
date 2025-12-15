import { useState } from 'react'
import Modal from '@components/Modal'
import { studentQuestions, workerQuestions, calculateManduType, manduResults } from '@utils/manduData'
import QuizTopBar from '@components/quiz/QuizTopBar'
import QuizChoiceButton from '@components/quiz/QuizChoiceButton'
import QuizResultView from '@components/quiz/QuizResultView'

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
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    setSelectedChoice(null)
    return newAnswers
  }

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
      const nextAnswers = answers.slice(0, -1)
      setStep(nextStep)
      setAnswers(nextAnswers)
      setSelectedChoice(nextAnswers[nextStep] || null)
    }
  }

  const handleChoiceClick = (choice: string) => {
    if (selectedChoice === choice) {
      commitAnswer(choice)

      if (step < questions.length - 1) {
        setStep(step + 1)
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
  const result = showResult ? manduResults[calculateManduType(answers, questions)] : null
  const previousAnswer = answers[step]

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" scrollable={!showResult}>
      <div className="relative">
        {/* 귀여운 만두 데코 (메인 톤과 연결) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <img
            src="/mandu.png"
            alt=""
            className="absolute top-24 right-2 sm:top-28 sm:right-4 w-20 h-20 object-contain rotate-12"
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
              <>
                <QuizTopBar
                  step={step}
                  total={questions.length}
                  onBack={handlePrevious}
                  onClose={handleClose}
                  backEnabled={step > 0 || Boolean(category)}
                />

                {/* Question + choices */}
                <div className="pt-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-relaxed">
                    {currentQuestion.q}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                    {selectedChoice
                      ? `선택한 답을 한 번 더 탭하면 ${step === questions.length - 1 ? '완료' : '다음'}로 넘어가요.`
                      : '답을 탭해서 선택하세요.'}
                  </p>

                  <div className="mt-5 space-y-3">
                    <QuizChoiceButton
                      text={currentQuestion.a1}
                      onClick={() => handleChoiceClick(currentQuestion.a1)}
                      isSelected={selectedChoice === currentQuestion.a1}
                      isPreviouslySelected={previousAnswer === currentQuestion.a1}
                    />
                    <QuizChoiceButton
                      text={currentQuestion.a2}
                      onClick={() => handleChoiceClick(currentQuestion.a2)}
                      isSelected={selectedChoice === currentQuestion.a2}
                      isPreviouslySelected={previousAnswer === currentQuestion.a2}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary-50 border-2 border-primary-200 flex items-center justify-center">
                      <img src="/mandu.png" alt="" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-neutral-900">퀴즈 시작하기</div>
                      <div className="text-xs text-neutral-600">먼저 카테고리를 골라줘</div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                    aria-label="닫기"
                  >
                    <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCategory === 'student') {
                        setCategory('student')
                        setStep(0)
                        setAnswers([])
                        setShowResult(false)
                        setSelectedChoice(null)
                        return
                      }
                      setSelectedCategory('student')
                    }}
                    className={`w-full px-5 py-4 text-left rounded-2xl border-2 transition-colors ${
                      selectedCategory === 'student'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-primary-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-base font-bold text-neutral-900">대학생</div>
                    <div className="mt-1 text-sm text-neutral-600">지금 컨셉 그대로 시작해요</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCategory === 'worker') {
                        setCategory('worker')
                        setStep(0)
                        setAnswers([])
                        setShowResult(false)
                        setSelectedChoice(null)
                        return
                      }
                      setSelectedCategory('worker')
                    }}
                    className={`w-full px-5 py-4 text-left rounded-2xl border-2 transition-colors ${
                      selectedCategory === 'worker'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-primary-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-base font-bold text-neutral-900">직장인</div>
                    <div className="mt-1 text-sm text-neutral-600">아침부터 저녁까지 시간 흐름으로!</div>
                  </button>
                </div>

                <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
                  {selectedCategory
                    ? '선택한 카테고리를 한 번 더 탭하면 시작해요.'
                    : '카테고리를 탭해서 선택하세요.'}
                </p>
              </div>
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
