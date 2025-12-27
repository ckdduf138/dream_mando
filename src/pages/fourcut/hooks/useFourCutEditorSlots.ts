import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '@hooks/useToast'
import type { FourCutSlotState } from '@/types/fourcut' 

const DEFAULT_SLOT: FourCutSlotState = {
  imageUrl: null,
  offsetX: 0,
  offsetY: 0,
  zoom: 1,
}

const makeInitialSlots = (count: number): FourCutSlotState[] => Array.from({ length: count }, () => ({ ...DEFAULT_SLOT }))

export const useFourCutEditorSlots = (slotCount: number) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slots, setSlots] = useState<FourCutSlotState[]>(() => makeInitialSlots(slotCount))
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const previousObjectUrlsRef = useRef<string[]>([])
  const { showToast } = useToast()

  useEffect(() => {
    setSelectedIndex(0)
    setSlots(makeInitialSlots(slotCount))
  }, [slotCount])

  useEffect(() => {
    return () => {
      previousObjectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      previousObjectUrlsRef.current = []
    }
  }, [])

  const selectedSlot = slots[selectedIndex]

  const updateSlot = (index: number, next: FourCutSlotState) => {
    setSlots((prev) => prev.map((s, i) => (i === index ? next : s)))
  }

  const replaceSlotImageWithObjectUrl = (index: number, objectUrl: string) => {
    previousObjectUrlsRef.current.push(objectUrl)

    setSlots((prev) =>
      prev.map((s, i) => {
        if (i !== index) return s
        return {
          imageUrl: objectUrl,
          offsetX: 0,
          offsetY: 0,
          zoom: 1,
        }
      }),
    )
  }

  const pickFromDevice = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일만 가능해요')
      return
    }

    const url = URL.createObjectURL(file)
    replaceSlotImageWithObjectUrl(selectedIndex, url)
  }

  const onCapture = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    replaceSlotImageWithObjectUrl(selectedIndex, url)
  }

  const clearSelectedSlot = () => {
    updateSlot(selectedIndex, {
      imageUrl: null,
      offsetX: 0,
      offsetY: 0,
      zoom: 1,
    })
  }

  const resetSelectedTransform = () => {
    updateSlot(selectedIndex, {
      ...selectedSlot,
      offsetX: 0,
      offsetY: 0,
      zoom: 1,
    })
  }

  const setSelectedZoom = (zoom: number) => {
    updateSlot(selectedIndex, {
      ...selectedSlot,
      zoom,
    })
  }

  const canEdit = useMemo(() => !!selectedSlot?.imageUrl, [selectedSlot?.imageUrl])

  return {
    slots,
    selectedIndex,
    setSelectedIndex,
    selectedSlot,
    updateSlot,
    pickFromDevice,
    fileInputRef,
    onFileChange,
    onCapture,
    clearSelectedSlot,
    resetSelectedTransform,
    setSelectedZoom,
    canEdit,
  }
}
