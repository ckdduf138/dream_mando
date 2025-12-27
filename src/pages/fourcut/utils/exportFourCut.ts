import { FourCutSlotState } from '@/types/fourcut'
import type { FourCutFrameConfig } from '@utils/fourcutFrames'

type ExportOptions = {
  /** The pixel width of the exported strip canvas. Height is derived from frame aspectRatio. */
  widthPx?: number
  /** Scale factor from editor pixels -> export pixels (computed from DOM size). */
  editorToExportScale: number
}


const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })

const drawCoverImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  zoom: number,
  offsetX: number,
  offsetY: number,
) => {
  const imgW = img.naturalWidth || img.width
  const imgH = img.naturalHeight || img.height

  // Base cover scale to fill the slot.
  const baseScale = Math.max(w / imgW, h / imgH)
  const scale = baseScale * zoom

  const drawW = imgW * scale
  const drawH = imgH * scale

  // Centered placement, then apply user offsets (already scaled to export px).
  const cx = x + w / 2 + offsetX
  const cy = y + h / 2 + offsetY

  ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH)
}

const drawStickerAt = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  size: number,
  rotateDeg: number,
  alpha: number,
) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((rotateDeg * Math.PI) / 180)
  ctx.globalAlpha = alpha
  ctx.drawImage(img, -size / 2, -size / 2, size, size)
  ctx.restore()
}

export const exportFourCutToBlob = async (
  frame: FourCutFrameConfig,
  slots: FourCutSlotState[],
  options: ExportOptions,
): Promise<Blob> => {
  const widthPx = options.widthPx ?? 1200
  const heightPx = Math.round(widthPx / frame.aspectRatio)

  const canvas = document.createElement('canvas')
  canvas.width = widthPx
  canvas.height = heightPx

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No canvas context')

  // 1. z-0: background.svg
  const bgImg = await loadImage('/fourcut/basic/background.svg')
  ctx.drawImage(bgImg, 0, 0, widthPx, heightPx)

  // Preload mandu assets once
  const overlayCache = new Map<string, HTMLImageElement>()
  const ensureOverlay = async (src: string) => {
    const cached = overlayCache.get(src)
    if (cached) return cached
    const img = await loadImage(src)
    overlayCache.set(src, img)
    return img
  }

  // 2. z-10: 사용자 이미지 (각 slot)
  for (let i = 0; i < frame.slots.length; i += 1) {
    const rect = frame.slots[i]
    const slot = slots[i]
    const x = (rect.leftPct / 100) * widthPx
    const y = (rect.topPct / 100) * heightPx
    const w = (rect.widthPct / 100) * widthPx
    const h = (rect.heightPct / 100) * heightPx
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()
    if (slot?.imageUrl) {
      const img = await loadImage(slot.imageUrl)
      drawCoverImage(
        ctx,
        img,
        x,
        y,
        w,
        h,
        slot.zoom,
        slot.offsetX * options.editorToExportScale,
        slot.offsetY * options.editorToExportScale,
      )
    }
    ctx.restore()
  }

  // 3. z-20: masking.svg (사진 위에 마스킹)
  const maskImg = await loadImage('/fourcut/basic/masking.svg')
  ctx.drawImage(maskImg, 0, 0, widthPx, heightPx)

  // 4. z-30: overlay.svg (항상 맨 위)
  const overlayImg = await loadImage('/fourcut/basic/overlay.svg')
  ctx.drawImage(overlayImg, 0, 0, widthPx, heightPx)

  // Very subtle foreground strip decal (can overlap photos)
  {
    const base = Math.min(widthPx, heightPx)
    const img = await ensureOverlay('/mandu2.png')
    const prevComposite = ctx.globalCompositeOperation
    const prevFilter = ctx.filter
    ctx.globalCompositeOperation = 'multiply'
    ctx.filter = 'blur(0.3px)'
    drawStickerAt(ctx, img, widthPx * 0.14, heightPx * 0.44, base * 0.18, 6, 0.10)
    ctx.filter = prevFilter
    ctx.globalCompositeOperation = prevComposite
  }

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
  if (!blob) throw new Error('Failed to export image')
  return blob
}
