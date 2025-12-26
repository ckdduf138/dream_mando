import { useCallback } from 'react'
import Modal from '@components/Modal'
import { useCameraCapture } from '@pages/fourcut/hooks/useCameraCapture'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCapture: (blob: Blob) => void
}

const CameraCaptureModal = ({ isOpen, onClose, onCapture }: Props) => {
  const { canUseCamera, starting, videoRef, captureImage } = useCameraCapture(isOpen)

  const handleCapture = useCallback(async () => {
    const blob = await captureImage()
    if (!blob) return
    onCapture(blob)
    onClose()
  }, [captureImage, onCapture, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollable={false}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-neutral-900">카메라</h2>
        <button
          onClick={onClose}
          className="px-3 py-2 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 active:scale-95"
        >
          닫기
        </button>
      </div>

      {!canUseCamera ? (
        <div className="text-neutral-700">이 브라우저에서는 카메라를 사용할 수 없어요.</div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />
          </div>

          <button
            disabled={starting}
            onClick={handleCapture}
            className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 text-white text-2xl font-bold rounded-xl transition-all active:scale-95"
          >
            {starting ? '카메라 여는 중…' : '촬영하기'}
          </button>

          <p className="text-base text-neutral-500">iOS/모바일에서는 HTTPS 환경에서만 카메라가 동작할 수 있어요.</p>
        </div>
      )}
    </Modal>
  )
}

export default CameraCaptureModal
