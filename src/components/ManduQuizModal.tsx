import { useState } from 'react'
import Modal from '@components/Modal'
import { manduQuestions, calculateManduType, manduResults } from '@utils/manduData'

interface ManduQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ManduQuizModal({ isOpen, onClose }: ManduQuizModalProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    if (!selectedChoice) return
    
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    setSelectedChoice(null)

    if (step < manduQuestions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice(answers[step - 1] || null)
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers([])
    setShowResult(false)
    setSelectedChoice(null)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const currentQuestion = manduQuestions[step]
  const result = showResult ? manduResults[calculateManduType(answers)] : null
  const previousAnswer = answers[step]

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors z-10"
      >
        <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {!showResult ? (
        <div className="space-y-6 pt-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>{step + 1} / {manduQuestions.length}</span>
              <span>{Math.round(((step + 1) / manduQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                style={{ width: `${((step + 1) / manduQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="py-6">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 text-center mb-8 leading-relaxed px-2">
              {currentQuestion.q}
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedChoice(currentQuestion.a1)}
                className={`w-full px-5 py-4 text-left rounded-xl border-2 transition-all text-sm sm:text-base ${
                  selectedChoice === currentQuestion.a1
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : previousAnswer === currentQuestion.a1
                    ? 'border-neutral-300 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {currentQuestion.a1}
              </button>
              <button
                onClick={() => setSelectedChoice(currentQuestion.a2)}
                className={`w-full px-5 py-4 text-left rounded-xl border-2 transition-all text-sm sm:text-base ${
                  selectedChoice === currentQuestion.a2
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : previousAnswer === currentQuestion.a2
                    ? 'border-neutral-300 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {currentQuestion.a2}
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                step === 0
                  ? 'text-neutral-300 cursor-not-allowed'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              ← 이전
            </button>
            
            <button
              onClick={() => handleAnswer(selectedChoice!)}
              disabled={!selectedChoice}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                selectedChoice
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {step === manduQuestions.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 py-8">
          {/* Result */}
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto mb-4">
              <img 
                src="/mandu.png" 
                alt="만두 캐릭터" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                {result?.title}
              </h3>
              <p className="text-neutral-600 text-base sm:text-lg">
                {result?.description}
              </p>
            </div>
            
            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {result?.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-600">
              결과를 인스타그램에 공유해보세요
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-neutral-100 text-neutral-900 font-semibold rounded-xl hover:bg-neutral-200 transition-all"
              >
                다시 하기
              </button>
              <button 
                onClick={() => window.open('https://instagram.com/dreaming_mandu', '_blank')}
                className="flex-1 px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-all"
              >
                공유하기
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
