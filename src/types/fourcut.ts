// Shared types & constants for the FourCut editor/export features.
// Placed under `src/types` to make usage discoverable and maintainable.

export type FourCutSlotState = {
  imageUrl: string | null
  offsetX: number
  offsetY: number
  zoom: number
}

export interface ExportOptions {
  /** The pixel width of the exported strip canvas. Height is derived from frame aspectRatio. */
  widthPx?: number
  /** Scale factor from editor pixels -> export pixels (computed from DOM size). */
  editorToExportScale: number
}

// Export defaults
export const DEFAULT_EXPORT_WIDTH = 1200
export const DEFAULT_EDITOR_TO_EXPORT_SCALE = 1

// Editor zoom limits
export const MIN_ZOOM = 0.5
export const MAX_ZOOM = 2

// Wheel zoom sensitivity (smaller = less zoom per wheel delta)
export const WHEEL_ZOOM_SENSITIVITY = 0.002

// The editor renders slot images slightly oversized to avoid tiny edge gaps.
// Keep this in sync with export to avoid position/scale mismatches.
export const EDITOR_IMAGE_OVERFILL = 1.1
