import { useState } from 'react'
import ManduQuizModal from '@components/ManduQuizModal'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero - Mandu Character */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          {/* 배경 만두 이미지들 */}
          <div className="absolute inset-0 opacity-10">
            <img src="/mandu.png" alt="" className="absolute top-8 left-12 w-14 h-14 object-contain rotate-15" />
            <img src="/mandu.png" alt="" className="absolute top-16 right-10 w-12 h-12 object-contain -rotate-20" />
            <img src="/mandu.png" alt="" className="absolute bottom-24 left-16 w-14 h-14 object-contain rotate-30" />
            <img src="/mandu.png" alt="" className="absolute bottom-20 right-14 w-12 h-12 object-contain -rotate-25" />
            <img src="/mandu.png" alt="" className="absolute top-1/3 left-1/4 w-10 h-10 object-contain rotate-45" />
            <img src="/mandu.png" alt="" className="absolute top-2/3 right-1/3 w-12 h-12 object-contain -rotate-35" />
          </div>
          
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              잠시 멈춰 선 너에게,<br />
              <span className="text-primary-600">진짜 나</span>를 찾아 떠나는 여정
            </h1>
            <div className="flex justify-center mb-6">
              <img 
                src="/mandu.png" 
                alt="꿈꿀 만두 캐릭터" 
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              나의 속재료 찾기
            </h1>
            <p className="text-base sm:text-lg text-neutral-600">
              10가지 질문으로 알아보는 나만의 만두 유형
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-primary-50 py-12 sm:py-16 border-y border-primary-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="relative inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-900 mb-8 relative z-10">
                숨겨진 <span className="text-primary-600">나의 가치</span> 발견하기
              </h2>
              <img src="/mandu.png" alt="" className="absolute -top-7 -right-12 w-16 h-16 object-contain opacity-25 rotate-15 z-0" />
              <img src="/mandu.png" alt="" className="absolute -bottom-5 -left-12 w-14 h-14 object-contain opacity-25 -rotate-20 z-0" />
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-primary-200 relative overflow-hidden">
              {/* 타임라인 스타일 */}
              <div className="relative space-y-6 pl-8">
                {/* 세로 라인 */}
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-primary-200"></div>
                
                {/* 첫 번째 메시지 */}
                <div className="relative">
                  <img src="/mandu.png" alt="" className="absolute -left-8 top-0 w-7 h-7 object-contain" />
                  <div className="bg-primary-50 p-4 rounded-lg relative">
                    <p className="text-neutral-700 leading-relaxed">
                      여기는 바로, 숨겨진 너의 가치를 발견하고<br />
                      온 세상에 너만의 빛을 선사할<br />
                      <strong className="font-bold text-neutral-900 text-lg">운명적인 여정의 시작</strong>
                    </p>
                  </div>
                </div>

                {/* 두 번째 메시지 */}
                <div className="relative">
                  <img src="/mandu.png" alt="" className="absolute -left-8 top-0 w-7 h-7 object-contain" />
                  <div className="bg-primary-50 p-4 rounded-lg relative">
                    <p className="text-neutral-700 leading-relaxed">
                      우리는 <strong className="font-bold text-neutral-900">꿈꿀 만두</strong>야<br />
                      세상에서 단 하나뿐인<br />
                      <strong className="font-bold text-neutral-900 text-lg">진짜 나의 만두소</strong>를 채워줄<br />
                      삶의 나침반 같은 존재라구
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                <div className="relative inline-block">
                  <h3 className="text-lg font-bold text-neutral-900 mb-5 text-center relative z-10">
                    꿈꿀 만두가 너를 초대하는 이유
                  </h3>
                  <img src="/mandu.png" alt="" className="absolute -top-6 -right-12 w-14 h-14 object-contain opacity-25 rotate-35 z-0" />
                  <img src="/mandu.png" alt="" className="absolute -bottom-4 -left-11 w-12 h-12 object-contain opacity-25 -rotate-35 z-0" />
                </div>
                {/* 넘버링 스타일 */}
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center relative z-10">1</div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">막연함은 지워버려</strong>
                      <p className="text-sm text-neutral-600">너만의 특별한 만두소를 만두자</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center relative z-10">2</div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">나만의 캐릭터 만들기</strong>
                      <p className="text-sm text-neutral-600">너 만의 만둘어 가지 않을래</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center relative z-10">3</div>
                    <div className="flex-1">
                      <strong className="font-bold text-neutral-900 block mb-1">터지는 에너지</strong>
                      <p className="text-sm text-neutral-600">만두는 역시 속이 꽉 차야지</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-primary-50 border-t border-primary-100">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-primary-200">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full px-8 py-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xl font-bold rounded-xl transition-all active:scale-95 mb-4"
              >
                테스트 시작하기
              </button>

              <a 
                href="https://instagram.com/dreaming_mandu" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @dreaming_mandu
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ManduQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  )
}
