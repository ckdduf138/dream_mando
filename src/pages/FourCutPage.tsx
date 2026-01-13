import { FOURCUT_FRAMES } from '@utils/fourcutFrames'
import { useNavigate } from 'react-router-dom'
import FourCutTopBar from '@pages/fourcut/components/FourCutTopBar'
import FourCutFrameCard from '@pages/fourcut/components/FourCutFrameCard'

const FourCutPage = () => {
  const navigate = useNavigate()
  const hasMultipleFrames = FOURCUT_FRAMES.length > 1
  const defaultFrame = FOURCUT_FRAMES[0]
  const defaultFrameId = defaultFrame?.id ?? 'basic'
  const examplePreviewSrc = '/fourcut/basic/example-preview.png'

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
      <FourCutTopBar title={hasMultipleFrames ? '프레임 선택' : '네컷 예시'} leftLabel="홈" onLeft={() => navigate('/')} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {hasMultipleFrames ? (
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center sm:justify-items-stretch">
              {FOURCUT_FRAMES.map((frame) => (
                <FourCutFrameCard key={frame.id} frame={frame} onSelect={(id) => navigate(`/fourcut/${id}`)} />
              ))}
            </div>
          </div>
        ) : (
          <section className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="text-neutral-900">
                <h2 className="text-2xl font-bold">만두네컷 만들기</h2>
                <p className="mt-2 text-neutral-600">사진 4장을 선택해서 넣고, 위치를 조정한 뒤 사진으로 저장해요.</p>
              </div>

              {defaultFrame && (
                <div className="mt-5">
                  <div className="mx-auto w-40 sm:w-48" style={{ aspectRatio: String(defaultFrame.aspectRatio) }}>
                    <img
                      src={examplePreviewSrc}
                      alt="만두네컷 예시 미리보기"
                      className="block w-full h-full object-cover rounded-2xl border border-neutral-100"
                      draggable={false}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-semibold text-neutral-900">이렇게 만들어요</div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm text-neutral-600">
                      <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">사진 4장 넣기</div>
                      <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">크기·위치 조절</div>
                      <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">사진 저장</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() => navigate(`/fourcut/${defaultFrameId}`)}
                  className="w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-neutral-900 text-white text-2xl font-bold hover:bg-neutral-800 active:scale-[0.99]"
                >
                  바로 만들기
                </button>
                <div className="mt-3 text-center text-sm text-neutral-500">프레임은 추후 더 추가될 수 있어요.</div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default FourCutPage
