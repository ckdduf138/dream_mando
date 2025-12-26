import type { FourCutFrameConfig } from '@utils/fourcutFrames'
import type { FourCutSlotState } from '@pages/fourcut/FourCutFrameEditor'

type ExportOptions = {
  /** The pixel width of the exported strip canvas. Height is derived from frame aspectRatio. */
  widthPx?: number
  /** Scale factor from editor pixels -> export pixels (computed from DOM size). */
  editorToExportScale: number
}

const resolveTailwindBgColor = (className: string, fallback: string) => {
  try {
    const el = document.createElement('div')
    el.className = className
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    el.style.top = '-9999px'
    document.body.appendChild(el)
    const color = window.getComputedStyle(el).backgroundColor
    document.body.removeChild(el)
    return color && color !== 'rgba(0, 0, 0, 0)' ? color : fallback
  } catch {
    return fallback
  }
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

type Corner = 'tl' | 'tr' | 'bl' | 'br'

type ManduOverlayConfig = { src: string; corner: Corner; rotate: number }

const getManduBgOverlaysForSlot = (index: number): ManduOverlayConfig[] => {
  const configs: Array<Array<ManduOverlayConfig>> = [
    [
      { src: '/mandu.png', corner: 'tl', rotate: 12 },
      { src: '/mandu2.png', corner: 'br', rotate: -12 },
    ],
    [
      { src: '/mandu2.png', corner: 'tr', rotate: -12 },
      { src: '/mandu.png', corner: 'bl', rotate: 12 },
    ],
    [
      { src: '/mandu.png', corner: 'tl', rotate: -6 },
      { src: '/mandu2.png', corner: 'tr', rotate: 6 },
    ],
    [
      { src: '/mandu2.png', corner: 'bl', rotate: 6 },
      { src: '/mandu.png', corner: 'br', rotate: -6 },
    ],
  ]

  return configs[index % configs.length]
}

const getManduFgOverlaysForSlot = (index: number): ManduOverlayConfig[] => {
  const configs: Array<Array<ManduOverlayConfig>> = [
    [{ src: '/mandu.png', corner: 'tr', rotate: 12 }],
    [{ src: '/mandu2.png', corner: 'bl', rotate: -12 }],
    [{ src: '/mandu.png', corner: 'br', rotate: -6 }],
    [{ src: '/mandu2.png', corner: 'tl', rotate: 6 }],
  ]
  return configs[index % configs.length]
}

const drawCornerSticker = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  corner: Corner,
  rotateDeg: number,
  alpha = 0.14,
  sizeScale = 0.32,
  marginScale = 0.06,
) => {
  const size = Math.min(w, h) * sizeScale
  const margin = Math.min(w, h) * marginScale

  const cx = corner.includes('r') ? x + w - margin - size / 2 : x + margin + size / 2
  const cy = corner.includes('b') ? y + h - margin - size / 2 : y + margin + size / 2

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((rotateDeg * Math.PI) / 180)
  ctx.globalAlpha = alpha
  ctx.drawImage(img, -size / 2, -size / 2, size, size)
  ctx.restore()
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

  // Background
  ctx.fillStyle = resolveTailwindBgColor('bg-primary-50', '#ffffff')
  ctx.fillRect(0, 0, widthPx, heightPx)

  // Frame image as background (so it never covers slot photos)
  if (frame.frameSrc) {
    const bg = await loadImage(frame.frameSrc)
    ctx.drawImage(bg, 0, 0, widthPx, heightPx)
  }

  // Preload mandu assets once
  const overlayCache = new Map<string, HTMLImageElement>()
  const ensureOverlay = async (src: string) => {
    const cached = overlayCache.get(src)
    if (cached) return cached
    const img = await loadImage(src)
    overlayCache.set(src, img)
    return img
  }

  // Strip-level mandu decals (outside slots too)
  {
    const base = Math.min(widthPx, heightPx)
    const decals: Array<{ src: string; nx: number; ny: number; size: number; rotate: number; alpha: number }> = [
      { src: '/mandu.png', nx: 0.06, ny: 0.16, size: 0.24, rotate: 12, alpha: 0.12 },
      { src: '/mandu2.png', nx: 0.94, ny: 0.26, size: 0.24, rotate: -12, alpha: 0.12 },
      { src: '/mandu.png', nx: 0.95, ny: 0.88, size: 0.28, rotate: 6, alpha: 0.10 },
    ]

    const prevComposite = ctx.globalCompositeOperation
    const prevFilter = ctx.filter
    ctx.globalCompositeOperation = 'multiply'
    ctx.filter = 'blur(0.5px)'

    for (const decal of decals) {
      const img = await ensureOverlay(decal.src)
      drawStickerAt(
        ctx,
        img,
        widthPx * decal.nx,
        heightPx * decal.ny,
        base * decal.size,
        decal.rotate,
        decal.alpha,
      )
    }

    ctx.filter = prevFilter
    ctx.globalCompositeOperation = prevComposite
  }

  // Draw each slot (clipped) and its image.
  for (let i = 0; i < frame.slots.length; i += 1) {
    const rect = frame.slots[i]
    const slot = slots[i]

    const x = (rect.leftPct / 100) * widthPx
    const y = (rect.topPct / 100) * heightPx
    const w = (rect.widthPct / 100) * widthPx
    const h = (rect.heightPct / 100) * heightPx

    // Slot background
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()

    // Slot background fill (subtle)
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(x, y, w, h)

    // Mandu background decals (behind photo) - always
    {
      const overlays = getManduBgOverlaysForSlot(i)
      for (const overlay of overlays) {
        const overlayImg = await ensureOverlay(overlay.src)
        const prevComposite = ctx.globalCompositeOperation
        const prevFilter = ctx.filter
        ctx.globalCompositeOperation = 'multiply'
        ctx.filter = 'blur(0.3px)'
        drawCornerSticker(ctx, overlayImg, x, y, w, h, overlay.corner, overlay.rotate, 0.18, 0.36, 0.07)
        ctx.filter = prevFilter
        ctx.globalCompositeOperation = prevComposite
      }
    }

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

    // Mandu foreground stickers (on top of photo) - always
    {
      const overlays = getManduFgOverlaysForSlot(i)
      for (const overlay of overlays) {
        const overlayImg = await ensureOverlay(overlay.src)
        const prevComposite = ctx.globalCompositeOperation
        ctx.globalCompositeOperation = 'multiply'
        drawCornerSticker(ctx, overlayImg, x, y, w, h, overlay.corner, overlay.rotate, 0.38, 0.28, 0.06)
        ctx.globalCompositeOperation = prevComposite
      }
    }

    ctx.restore()

    // Slot border
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = Math.max(2, Math.round(widthPx * 0.002))
    ctx.strokeRect(x, y, w, h)
  }

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
