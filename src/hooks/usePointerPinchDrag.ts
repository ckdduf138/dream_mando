import { useCallback, useRef } from 'react'

type Point = { x: number; y: number }

export type DragPinchState = {
  offsetX: number
  offsetY: number
  zoom: number
}

type UpdateFn = (next: DragPinchState) => void

type Options = {
  minZoom?: number
  maxZoom?: number
}

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

const distance = (a: Point, b: Point): number => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}

export const usePointerPinchDrag = (options?: Options) => {
  const minZoom = options?.minZoom ?? 1
  const maxZoom = options?.maxZoom ?? 3

  const pointersRef = useRef<Map<number, Point>>(new Map())
  const startPointersRef = useRef<Map<number, Point>>(new Map())
  const baseRef = useRef<{
    start: DragPinchState
    startDist: number | null
    startCenter: Point | null
  } | null>(null)

  const onPointerDown = useCallback(
    (e: React.PointerEvent, state: DragPinchState, update: UpdateFn) => {
      // Only left click / touch / pen
      if (e.pointerType === 'mouse' && e.button !== 0) return

      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      const p = { x: e.clientX, y: e.clientY }
      pointersRef.current.set(e.pointerId, p)
      startPointersRef.current.set(e.pointerId, p)

      const points = Array.from(pointersRef.current.values())
      if (points.length === 1) {
        baseRef.current = { start: state, startDist: null, startCenter: points[0] }
      } else if (points.length === 2) {
        const [p1, p2] = points
        baseRef.current = {
          start: state,
          startDist: distance(p1, p2),
          startCenter: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
        }
      }

      update(state)
    },
    [],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent, state: DragPinchState, update: UpdateFn) => {
      if (!pointersRef.current.has(e.pointerId)) return
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      const base = baseRef.current
      if (!base) return

      const points = Array.from(pointersRef.current.values())
      if (points.length === 1) {
        const curr = points[0]

        // If we just came back from pinch -> single pointer, reset base.
        if (base.startDist !== null) {
          baseRef.current = { start: state, startDist: null, startCenter: curr }
          startPointersRef.current.set(e.pointerId, curr)
          return
        }

        const startPoint = startPointersRef.current.get(e.pointerId)
        const startCenter = base.startCenter
        if (!startPoint || !startCenter) return

        const dx = curr.x - startPoint.x
        const dy = curr.y - startPoint.y

        update({
          zoom: clamp(base.start.zoom, minZoom, maxZoom),
          offsetX: base.start.offsetX + dx,
          offsetY: base.start.offsetY + dy,
        })
        return
      }

      if (points.length >= 2 && base.startDist && base.startCenter) {
        const [p1, p2] = points
        const distNow = distance(p1, p2)
        const centerNow = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }

        const scale = distNow / base.startDist
        const nextZoom = clamp(base.start.zoom * scale, minZoom, maxZoom)

        // Also pan with the pinch center movement.
        const dx = centerNow.x - base.startCenter.x
        const dy = centerNow.y - base.startCenter.y

        update({
          zoom: nextZoom,
          offsetX: base.start.offsetX + dx,
          offsetY: base.start.offsetY + dy,
        })
      }
    },
    [minZoom, maxZoom],
  )

  const onPointerUpOrCancel = useCallback((e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId)
    startPointersRef.current.delete(e.pointerId)
    if (pointersRef.current.size === 0) {
      baseRef.current = null
    }
  }, [])

  return { onPointerDown, onPointerMove, onPointerUpOrCancel }
}
