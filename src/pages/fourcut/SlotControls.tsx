import { useMemo } from 'react'
import { FourCutSlotState } from './FourCutFrameEditor'

type Props = {
  index: number
  slot: FourCutSlotState
  onPickFromDevice: () => void
  onOpenCamera: () => void
  onClear: () => void
  onResetTransform: () => void
  onZoomChange: (zoom: number) => void
}

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

const SlotControls = ({
  index,
  slot,
  onPickFromDevice,
  onOpenCamera,
  onClear,
  onResetTransform,
  onZoomChange,
}: Props) => {
  const zoomValue = useMemo(() => clamp(slot.zoom, 1, 3), [slot.zoom])

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-neutral-900">{`${index + 1}번 칸`}</h3>
        {slot.imageUrl ? (
          <button
            onClick={onClear}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 active:scale-95"
          >
            삭제
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onPickFromDevice}
          className="px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xl font-bold active:scale-95"
        >
          사진 가져오기
        </button>
        <button
          onClick={onOpenCamera}
          className="px-4 py-3 rounded-xl border border-primary-200 text-primary-800 hover:bg-primary-50 text-xl font-bold active:scale-95"
        >
          카메라
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg text-neutral-700">확대</span>
          <span className="text-lg text-neutral-600">{zoomValue.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoomValue}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="w-full"
          disabled={!slot.imageUrl}
        />

        <button
          onClick={onResetTransform}
          disabled={!slot.imageUrl}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-800 hover:bg-neutral-50 disabled:opacity-50 text-xl font-bold active:scale-95"
        >
          위치/확대 초기화
        </button>

        <p className="mt-2 text-sm text-neutral-500">사진을 선택한 상태에서 프레임 안을 드래그하면 위치를 조정할 수 있어요.</p>
      </div>
    </div>
  )
}

export default SlotControls
