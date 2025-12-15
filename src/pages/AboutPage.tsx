import Card from '@components/Card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            꿈꿀만두 소개
          </h1>
          <p className="text-lg text-neutral-600">
            나를 찾아가는 여정의 시작
          </p>
        </div>
        
        <div className="space-y-6">
          <Card title="프로젝트 소개">
            <p className="text-neutral-700 leading-relaxed mb-4">
              꿈꿀만두는 현대인들이 자신의 진짜 모습을 발견하고, 
              숨겨진 가치를 찾아갈 수 있도록 돕는 프로젝트입니다.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              간단한 테스트를 통해 나만의 속재료를 찾고, 
              나를 표현하는 특별한 캐릭터를 만나보세요.
            </p>
          </Card>

          <Card title="기술 스택">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-neutral-50">
                <p className="font-semibold text-neutral-900 mb-1">Frontend</p>
                <p className="text-sm text-neutral-600">React 18 + TypeScript</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50">
                <p className="font-semibold text-neutral-900 mb-1">Styling</p>
                <p className="text-sm text-neutral-600">Tailwind CSS</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50">
                <p className="font-semibold text-neutral-900 mb-1">Build Tool</p>
                <p className="text-sm text-neutral-600">Vite</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50">
                <p className="font-semibold text-neutral-900 mb-1">Routing</p>
                <p className="text-sm text-neutral-600">React Router</p>
              </div>
            </div>
          </Card>

          <Card title="디자인 철학">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">심플함</h4>
                <p className="text-sm text-neutral-600">
                  불필요한 요소를 제거하고, 핵심에 집중한 디자인
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">친근함</h4>
                <p className="text-sm text-neutral-600">
                  따뜻하고 귀여운 느낌으로 사용자에게 편안함을 전달
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">직관성</h4>
                <p className="text-sm text-neutral-600">
                  누구나 쉽게 이해하고 사용할 수 있는 인터페이스
                </p>
              </div>
            </div>
          </Card>

          <Card title="문의하기">
            <div className="text-center space-y-4">
              <p className="text-neutral-700">
                프로젝트에 대한 문의나 제안이 있으신가요?
              </p>
              <a
                href="https://instagram.com/dreaming_mandu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Instagram에서 문의하기
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
