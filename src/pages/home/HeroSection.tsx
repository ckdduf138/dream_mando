import useInView from '@hooks/useInView'

export default function HeroSection() {
  const hero = useInView<HTMLElement>({ rootMargin: '0px 0px -20% 0px', threshold: 0.1 })

  return (
    <section ref={hero.ref} className="relative py-14 sm:py-20 overflow-hidden">
      {/* 배경 만두 이미지들 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src="/mandu.png" alt="" className="absolute top-8 left-8 sm:left-12 w-14 h-14 object-contain rotate-15 float-soft" />
        <img src="/mandu.png" alt="" className="absolute top-16 right-6 sm:right-10 w-12 h-12 object-contain -rotate-20 float-soft-2" />
        <img src="/mandu.png" alt="" className="absolute bottom-24 left-10 sm:left-16 w-14 h-14 object-contain rotate-30 float-soft-3" />
        <img src="/mandu.png" alt="" className="absolute bottom-20 right-8 sm:right-14 w-12 h-12 object-contain -rotate-25 float-soft" />
        <img src="/mandu.png" alt="" className="absolute top-1/3 left-1/4 w-10 h-10 object-contain rotate-45 float-soft-2" />
        <img src="/mandu.png" alt="" className="absolute top-2/3 right-1/3 w-12 h-12 object-contain -rotate-35 float-soft-3" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <h1
          className={`reveal ${hero.inView ? 'is-visible' : ''} text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight`}
        >
          잠시 멈춰 선 너에게<br />
          <span className="text-primary-600">진짜 나</span>를 찾아 떠나는 여정
        </h1>

        <div className={`reveal ${hero.inView ? 'is-visible' : ''} reveal-delay-1 flex justify-center mb-6`}>
          <div className="relative">
            {/* 만두 뒤 작은 배경(좋아했던 포인트 유지/강화) */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary-100/70 blur-sm" />
            </div>
            <img
              src="/mandu.png"
              alt="꿈꿀 만두 캐릭터"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain float-soft"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>

        <h2
          className={`reveal ${hero.inView ? 'is-visible' : ''} reveal-delay-2 text-2xl sm:text-3xl font-bold text-neutral-900 mb-2`}
        >
          나의 속재료 찾기
        </h2>
        <p
          className={`reveal ${hero.inView ? 'is-visible' : ''} reveal-delay-3 text-base sm:text-lg text-neutral-600`}
        >
          10가지 질문으로 알아보는 나만의 만두 유형
        </p>
      </div>
    </section>
  )
}
