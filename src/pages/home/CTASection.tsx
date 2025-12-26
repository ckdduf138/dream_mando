import useInView from '@hooks/useInView'
import { useFontsReady } from '@hooks/useFontsReady'
import { useNavigate } from 'react-router-dom'
import { Instagram } from 'lucide-react'

interface CTASectionProps {
  onStartQuiz: () => void
}

const CTASection = ({ onStartQuiz }: CTASectionProps) => {
  const showText = useFontsReady()
  const cta = useInView<HTMLElement>({ rootMargin: '0px 0px -20% 0px', threshold: 0.1 })
  const navigate = useNavigate()

  return (
    <section ref={cta.ref} className="py-4 sm:py-10 bg-primary-50 border-t border-primary-100">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className={`reveal ${cta.inView ? 'is-visible' : ''} bg-white rounded-2xl p-5 sm:p-6 border border-primary-100`}>
          <button
            onClick={onStartQuiz}
            className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-2xl font-bold rounded-xl transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-sm mb-3"
          >
            {showText ? '테스트 시작하기' : <span className="inline-block h-7 rounded-lg bg-white/30 w-36 animate-pulse" />}
          </button>

          <button
            onClick={() => navigate('/fourcut')}
            className="w-full px-8 py-4 bg-white hover:bg-primary-50 text-primary-800 text-2xl font-bold rounded-xl border border-primary-200 transition-all active:scale-95"
          >
            {showText ? '만두네컷 만들기' : <span className="inline-block h-7 rounded-lg bg-primary-100/70 w-44 animate-pulse" />}
          </button>

          <a
            href="https://instagram.com/dreaming_mandu"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-lg text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            {showText ? '@dreaming_mandu' : <span className="inline-block h-5 rounded-lg bg-neutral-200 w-32 animate-pulse" />}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
