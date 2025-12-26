import { memo, useMemo } from 'react'
import { FourCutFrameConfig } from '@utils/fourcutFrames'
import { BasicFrameDecoration } from './components/BasicFrameDecoration'
import { usePointerPinchDrag, DragPinchState } from '@hooks/usePointerPinchDrag'
import { ImageUp } from 'lucide-react'

export type FourCutSlotState = {
  imageUrl: string | null
  offsetX: number
  offsetY: number
  zoom: number
}

type Props = {
  frame: FourCutFrameConfig
  slots: FourCutSlotState[]
  selectedIndex: number
  onSelect: (index: number) => void
  onUpdateSlot: (index: number, next: FourCutSlotState) => void
  onRequestUpload?: (index: number) => void
  frameContainerRef?: React.Ref<HTMLDivElement>
}

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

const applyWheelZoom = (currentZoom: number, deltaY: number, minZoom = 0.5, maxZoom = 2) => {
  // Negative deltaY usually means zoom in on trackpad.
  const factor = Math.exp(-deltaY * 0.002)
  return clamp(currentZoom * factor, minZoom, maxZoom)
}


const FourCutFrameEditor = ({
  frame,
  slots,
  selectedIndex,
  onSelect,
  onUpdateSlot,
  onRequestUpload,
  frameContainerRef,
}: Props) => {
  const { onPointerDown, onPointerMove, onPointerUpOrCancel } = usePointerPinchDrag({ minZoom: 0.5, maxZoom: 2 })

  const slotRects = useMemo(() => frame.slots, [frame.slots])

  return (
    <div className="w-full">
      <div
        ref={frameContainerRef}
        className="relative w-full overflow-hidden select-none bg-primary-50"
        style={{ aspectRatio: String(frame.aspectRatio) }}
      >
        {/* z-0: background.svg */}
        <div className="absolute inset-0 z-0">
          {frame.id === 'basic' && (
            <img src="/fourcut/basic/background.svg" alt="background" className="w-full h-full object-cover" draggable={false} />
          )}
        </div>

        {/* z-10: 사용자 이미지 */}
        {slotRects.map((rect, idx) => {
          const slot = slots[idx]
          const dragState: DragPinchState = { offsetX: slot.offsetX, offsetY: slot.offsetY, zoom: slot.zoom }
          return (
            <div
              key={idx}
              className="absolute z-10 overflow-hidden rounded-xl bg-transparent"
              style={{
                left: '50%',
                top: `${rect.topPct}%`,
                width: `${rect.widthPct}%`,
                height: `${rect.heightPct}%`,
                transform: `translateX(-50%)`,
                touchAction: 'none',
              }}
              role="button"
              tabIndex={0}
              aria-label={`사진 ${idx + 1}번 칸`}
              onClick={() => {
                onSelect(idx)
                onRequestUpload?.(idx)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(idx)
                  onRequestUpload?.(idx)
                }
              }}
              onPointerDown={(e) => {
                onSelect(idx)
                if (!slot.imageUrl) return
                onPointerDown(e, dragState, (next) => {
                  onUpdateSlot(idx, { ...slot, ...next })
                })
              }}
              onPointerMove={(e) => {
                if (!slot.imageUrl) return
                onPointerMove(e, dragState, (next) => {
                  onUpdateSlot(idx, { ...slot, ...next })
                })
              }}
              onPointerUp={onPointerUpOrCancel}
              onPointerCancel={onPointerUpOrCancel}
              onWheel={(e) => {
                if (!slot.imageUrl) return
                e.preventDefault()
                const minZoom = 0.5
                const maxZoom = 2
                const nextZoom = applyWheelZoom(slot.zoom, e.deltaY, minZoom, maxZoom)
                if (nextZoom === slot.zoom) return
                onUpdateSlot(idx, { ...slot, zoom: nextZoom })
              }}
            >
              {slot.imageUrl && (
                <img
                  src={slot.imageUrl}
                  alt=""
                  draggable={false}
                  className="absolute left-1/2 top-1/2 max-w-none select-none w-[110%] h-[110%] object-cover"
                  style={{
                    zIndex: 1,
                    transform: `translate(-50%, -50%) translate(${slot.offsetX}px, ${slot.offsetY}px) scale(${slot.zoom})`,
                    transformOrigin: 'center',
                  }}
                />
              )}
              {/* z-40: 사진 추가 버튼 (빈 슬롯일 때만) */}
              {!slot.imageUrl && (
                <div
                  className="absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (e.detail === 0) return;
                    onSelect(idx);
                    onRequestUpload?.(idx);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`사진 ${idx + 1}번 칸 추가`}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect(idx);
                      onRequestUpload?.(idx);
                    }
                  }}
                >
                  <div className="text-base sm:text-lg font-semibold text-neutral-700">눌러서 사진 추가하기</div>
                  <ImageUp className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400" />
                </div>
              )}
            </div>
          )
        })}

        {/* z-20: masking.svg */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {frame.id === 'basic' && (
            <img src="/fourcut/basic/masking.svg" alt="masking" className="w-full h-full object-cover" draggable={false} />
          )}
        </div>

        {/* z-30: overlay.svg */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {frame.id === 'basic' && (
            <img src="/fourcut/basic/overlay.svg" alt="overlay" className="w-full h-full object-cover" draggable={false} />
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>사진 위에서 드래그/핀치로 조정</span>
        <span>{`선택: ${clamp(selectedIndex + 1, 1, frame.slots.length)} / ${frame.slots.length}`}</span>
      </div>
    </div>
  )
}

export default memo(FourCutFrameEditor)
