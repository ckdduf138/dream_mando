import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFourCutFrameById } from '@utils/fourcutFrames'
import FourCutFrameEditor from '@pages/fourcut/FourCutFrameEditor'
import FourCutTopBar from '@pages/fourcut/components/FourCutTopBar'
import { useFourCutEditorSlots } from '@pages/fourcut/hooks/useFourCutEditorSlots'
import { useToast } from '@hooks/useToast'
import { Download } from 'lucide-react'
import { exportFourCutToBlob } from '@pages/fourcut/utils/exportFourCut'
import { useRef } from 'react'

const FourCutEditorPage = () => {
  const navigate = useNavigate()
  const { frameId } = useParams()
  const { showToast } = useToast()
  const frame = useMemo(() => getFourCutFrameById(frameId), [frameId])
  const frameContainerRef = useRef<HTMLDivElement | null>(null)
  const [downloading, setDownloading] = useState(false)

  const slotCount = frame?.slots.length ?? 4

  const { slots, selectedIndex, setSelectedIndex, updateSlot, pickFromDevice, fileInputRef, onFileChange } =
    useFourCutEditorSlots(slotCount)

  if (!frame) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-white">
        <FourCutTopBar title="네컷 만들기" leftLabel="뒤로" onLeft={() => navigate('/fourcut')} />
        <main className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-neutral-900">프레임을 찾을 수 없어요.</p>
            <button
              className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white"
              onClick={() => navigate('/fourcut')}
            >
              프레임 목록으로
            </button>
          </div>
        </main>
      </div>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const ok = !!file && file.type.startsWith('image/')
    onFileChange(e)
    if (ok) showToast('사진을 넣었어요.')
  }

  const handleDownload = async () => {
    if (!frame) return
    if (!frameContainerRef.current) {
      showToast('다운로드 준비 중이에요')
      return
    }

    const hasAll = slots.slice(0, frame.slots.length).every((s) => !!s.imageUrl)
    if (!hasAll) {
      showToast('사진 4장을 모두 넣어주세요')
      return
    }

    const rect = frameContainerRef.current.getBoundingClientRect()
    const exportWidthPx = 1200
    const exportHeightPx = Math.round(exportWidthPx / frame.aspectRatio)
    const editorToExportScaleX = rect.width > 0 ? exportWidthPx / rect.width : 1
    const editorToExportScaleY = rect.height > 0 ? exportHeightPx / rect.height : 1

    try {
      setDownloading(true)
      const blob = await exportFourCutToBlob(frame, slots, {
        widthPx: exportWidthPx,
        editorToExportScaleX,
        editorToExportScaleY,
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mandu-fourcut-${frame.id}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      showToast('이미지를 다운로드했어요')
    } catch {
      showToast('다운로드에 실패했어요')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
      <FourCutTopBar title="네컷 만들기" leftLabel="프레임" onLeft={() => navigate('/fourcut')} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

        <section className="mx-auto w-full max-w-xs sm:max-w-sm">
          <FourCutFrameEditor
            frame={frame}
            slots={slots}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onUpdateSlot={updateSlot}
            onRequestUpload={(index) => {
              setSelectedIndex(index)
              pickFromDevice()
            }}
            frameContainerRef={frameContainerRef}
          />

          <div className="mt-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-neutral-900 text-white text-2xl font-bold hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-60"
            >
              <Download className="w-6 h-6" />
              {downloading ? '다운로드 준비 중…' : '이미지 다운로드'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FourCutEditorPage
