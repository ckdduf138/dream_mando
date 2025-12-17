import useInView from '@hooks/useInView'

export default function StorySection() {
  const story = useInView<HTMLElement>({ rootMargin: '0px 0px -20% 0px', threshold: 0.1 })

  return (
    <section ref={story.ref} className="bg-primary-50 py-10 sm:py-14 border-y border-primary-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative">
          {/* 섹션 데코 만두: 카드에 가리지 않도록 위 레이어 */}
          <img
            src="/mandu.png"
            alt=""
            className="absolute -top-4 right-0 w-14 h-14 sm:-top-6 sm:right-2 sm:w-16 sm:h-16 object-contain opacity-30 rotate-12 z-0 pointer-events-none"
          />
          <img
            src="/mandu.png"
            alt=""
            className="absolute -bottom-4 left-0 w-14 h-14 sm:-bottom-6 sm:left-2 sm:w-14 sm:h-14 object-contain opacity-30 -rotate-12 z-0 pointer-events-none"
          />

          <h2
            className={`reveal ${story.inView ? 'is-visible' : ''} text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 relative z-10 tracking-tight text-center`}
          >
            숨겨진 <span className="text-primary-600">나의 가치</span> 발견하기
          </h2>
        </div>

        <div
          className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-1 bg-white rounded-2xl p-6 sm:p-8 border-[3px] border-dashed border-primary-200 relative overflow-hidden text-left`}
        >
          <div className="relative">
            <div className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-2 rounded-2xl bg-primary-50 border border-primary-100 overflow-hidden`}>
              {/* Social-post style header (근거: SNS에서 작성자/브랜드 헤더가 상단에 오는 패턴) */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white border-b-2 border-primary-200">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center flex-shrink-0">
                    <img src="/mandu.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl font-bold text-neutral-900 truncate">꿈꿀만두</div>
                    <div className="text-lg text-neutral-600">오늘의 이야기</div>
                  </div>
                </div>
              </div>

              {/* Body (근거: 본문은 읽기 흐름 중심, 들여쓰기=인용/강조 패턴) */}
              <div className="px-4 sm:px-5 py-5 sm:py-6 space-y-4">
                <div className="pl-4 border-l-2 border-primary-200">
                  <p className="text-neutral-700 leading-relaxed">
                    숨겨진 너의 가치를 발견하고 온 세상에 너만의 빛을 선사할
                    <strong className="ml-1 font-bold text-neutral-900">운명적인 여정의 시작</strong>
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-primary-200">
                  <p className="text-neutral-700 leading-relaxed">
                    세상에서 단 하나뿐인 <strong className="font-bold text-neutral-900">진짜 나의 만두소</strong>를 채워줄
                    삶의 나침반 같은 존재야
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 relative overflow-hidden">
              {/* 배경 데코 만두 (겹침/가림 방지: 박스 안에 완전히 들어오게 배치) */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                <img
                  src="/mandu.png"
                  alt=""
                  className="absolute top-3 left-3 w-16 h-16 object-contain rotate-12 float-soft"
                />
                <img
                  src="/mandu.png"
                  alt=""
                  className="absolute bottom-3 right-3 w-16 h-16 object-contain -rotate-12 float-soft-2"
                />
              </div>

              <div className="relative">
                <h3
                  className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-2 text-2xl font-bold text-neutral-900 mb-5 text-center`}
                >
                  꿈꿀 만두가 너를 초대하는 이유
                </h3>

                <div className="space-y-4">
                  <div className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-2 flex gap-4 items-start`}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center relative z-10">
                      1
                    </div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">막연함은 지워버려</strong>
                      <p className="text-lg text-neutral-600">너만의 특별한 만두소를 만두자</p>
                    </div>
                  </div>

                  <div className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-3 flex gap-4 items-start`}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center relative z-10">
                      2
                    </div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">나만의 캐릭터 만들기</strong>
                      <p className="text-lg text-neutral-600">너 만의 만둘어 가지 않을래</p>
                    </div>
                  </div>

                  <div className={`reveal ${story.inView ? 'is-visible' : ''} reveal-delay-4 flex gap-4 items-start`}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center relative z-10">
                      3
                    </div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">터지는 에너지</strong>
                      <p className="text-lg text-neutral-600">만두는 역시 속이 꽉 차야지</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
