import { FOURCUT_FRAMES } from '@utils/fourcutFrames'
import { useNavigate } from 'react-router-dom'
import FourCutTopBar from '@pages/fourcut/components/FourCutTopBar'
import FourCutFrameCard from '@pages/fourcut/components/FourCutFrameCard'

const FourCutPage = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
      <FourCutTopBar title="프레임 선택" leftLabel="홈" onLeft={() => navigate('/')} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center sm:justify-items-stretch">
            {FOURCUT_FRAMES.map((frame) => (
              <FourCutFrameCard key={frame.id} frame={frame} onSelect={(id) => navigate(`/fourcut/${id}`)} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default FourCutPage
