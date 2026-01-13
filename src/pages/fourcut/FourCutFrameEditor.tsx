import React, { memo, useMemo } from 'react'
import { FourCutFrameConfig, FourCutRect } from '@utils/fourcutFrames'
import { BasicFrameDecoration } from './components/BasicFrameDecoration'
import { usePointerPinchDrag, DragPinchState } from '@hooks/usePointerPinchDrag'
import { ImageUp } from 'lucide-react'
import type { FourCutSlotState } from '@/types/fourcut'
import { MIN_ZOOM, MAX_ZOOM, WHEEL_ZOOM_SENSITIVITY, EDITOR_IMAGE_OVERFILL } from '@/types/fourcut' 

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

const applyWheelZoom = (currentZoom: number, deltaY: number, minZoom = MIN_ZOOM, maxZoom = MAX_ZOOM) => {
  // Negative deltaY usually means zoom in on trackpad.
  const factor = Math.exp(-deltaY * WHEEL_ZOOM_SENSITIVITY)
  return clamp(currentZoom * factor, minZoom, maxZoom)
}

// --- Slot subcomponent: renders a single slot (z-10 image + z-40 add button when empty)
type SlotProps = {
  idx: number
  rect: FourCutRect
  slot: FourCutSlotState
  onSelect: (index: number) => void
  onUpdateSlot: (index: number, next: FourCutSlotState) => void
  onRequestUpload?: (index: number) => void
  onPointerDown: (e: any, state: DragPinchState, cb: (next: Partial<DragPinchState>) => void) => void
  onPointerMove: (e: any, state: DragPinchState, cb: (next: Partial<DragPinchState>) => void) => void
  onPointerUpOrCancel: (e?: any) => void
}

const Slot: React.FC<SlotProps> = ({ idx, rect, slot, onSelect, onUpdateSlot, onRequestUpload, onPointerDown, onPointerMove, onPointerUpOrCancel }) => {
  const dragState: DragPinchState = { offsetX: slot.offsetX, offsetY: slot.offsetY, zoom: slot.zoom }

  const handleOuterClick = () => {
    // Click on slot should select and allow replace (edit)
    onSelect(idx)
    onRequestUpload?.(idx)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    // Prevent bubbling to outer slot that also triggers upload
    e.stopPropagation()
    // Ignore synthetic clicks from keyboard press (detail === 0)
    if ((e as unknown as MouseEvent).detail === 0) return
    onSelect(idx)
    onRequestUpload?.(idx)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === e.target) {
      e.preventDefault()
      e.stopPropagation()
      onSelect(idx)
      onRequestUpload?.(idx)
    }
  }

  return (
    <div
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
      onClick={handleOuterClick}
      onKeyDown={(e) => {
        // If user presses Enter/Space on the slot, open upload
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOuterClick()
        }
      }}
      onPointerDown={(e: any) => {
        onSelect(idx)
        if (!slot.imageUrl) return
        onPointerDown(e, dragState, (next) => onUpdateSlot(idx, { ...slot, ...next }))
      }}
      onPointerMove={(e: any) => {
        if (!slot.imageUrl) return
        onPointerMove(e, dragState, (next) => onUpdateSlot(idx, { ...slot, ...next }))
      }}
      onPointerUp={onPointerUpOrCancel}
      onPointerCancel={onPointerUpOrCancel}
      onWheel={(e: any) => {
        if (!slot.imageUrl) return
        e.preventDefault()
        const nextZoom = applyWheelZoom(slot.zoom, e.deltaY, MIN_ZOOM, MAX_ZOOM)
        if (nextZoom === slot.zoom) return
        onUpdateSlot(idx, { ...slot, zoom: nextZoom })
      }}
    >
      {slot.imageUrl && (
        <img
          src={slot.imageUrl}
          alt=""
          draggable={false}
          className="absolute left-1/2 top-1/2 max-w-none select-none object-cover"
          style={{
            zIndex: 1,
            width: `${EDITOR_IMAGE_OVERFILL * 100}%`,
            height: `${EDITOR_IMAGE_OVERFILL * 100}%`,
            transform: `translate(-50%, -50%) translate(${slot.offsetX}px, ${slot.offsetY}px) scale(${slot.zoom})`,
            transformOrigin: 'center',
          }}
        />
      )}

      {!slot.imageUrl && (
        <div
          className="absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          onClick={handleAddClick}
          tabIndex={0}
          role="button"
          aria-label={`사진 ${idx + 1}번 칸 추가`}
          onKeyDown={handleKeyDown}
        >
          <div className="text-base sm:text-lg font-semibold text-neutral-700">눌러서 사진 추가하기</div>
          <ImageUp className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400" />
        </div>
      )}
    </div>
  )
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
  const { onPointerDown, onPointerMove, onPointerUpOrCancel } = usePointerPinchDrag({ minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM })

  const slotRects = useMemo(() => frame.slots, [frame.slots])

  return (
    <div className="w-full">
      <div
        ref={frameContainerRef}
        className="relative w-full overflow-hidden select-none bg-primary-50"
        style={{ aspectRatio: String(frame.aspectRatio) }}
      >
        {/* z-0/20/30: Basic frame decoration (background, masking, overlay) */}
        {frame.id === 'basic' && <BasicFrameDecoration />}

        {/* z-10: 사용자 이미지 (slot) */}
        {slotRects.map((rect, idx) => {
          const slot = slots[idx]
          return (
            <Slot
              key={idx}
              idx={idx}
              rect={rect}
              slot={slot}
              onSelect={onSelect}
              onUpdateSlot={onUpdateSlot}
              onRequestUpload={onRequestUpload}
              onPointerDown={(e: any, state: DragPinchState, cb: (n: Partial<DragPinchState>) => void) => onPointerDown(e, state, cb)}
              onPointerMove={(e: any, state: DragPinchState, cb: (n: Partial<DragPinchState>) => void) => onPointerMove(e, state, cb)}
              onPointerUpOrCancel={onPointerUpOrCancel}
            />
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>사진 위에서 드래그/핀치로 조정</span>
        <span>{`선택: ${clamp(selectedIndex + 1, 1, frame.slots.length)} / ${frame.slots.length}`}</span>
      </div>
    </div>
  )
}

export default memo(FourCutFrameEditor)
