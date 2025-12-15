import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseInViewOptions {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export default function useInView<T extends Element>(options: UseInViewOptions = {}) {
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.15, once = true } = options

  const nodeRef = useRef<T | null>(null)
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)

  const setRef = useCallback((node: T | null) => {
    nodeRef.current = node
    setNode(node)
  }, [])

  useEffect(() => {
    if (!node) return

    const getRequiredRatio = () => {
      if (Array.isArray(threshold)) return Math.min(...threshold)
      return threshold
    }

    const checkInViewFallback = () => {
      // Fallback: compute intersection ratio against viewport.
      // We intentionally ignore root/rootMargin here to keep this safe and simple.
      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      const intersectionRatio = rect.height > 0 ? Math.max(0, visibleHeight) / rect.height : 0

      if (visibleHeight > 0 && intersectionRatio >= getRequiredRatio()) {
        setInView(true)
        return true
      }

      if (!once) setInView(false)
      return false
    }

    let rafId: number | null = null
    const onScrollOrResize = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        checkInViewFallback()
      })
    }

    // Always run one check on mount so visible-at-load content never stays hidden.
    checkInViewFallback()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    let observer: IntersectionObserver | null = null
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer?.disconnect()
          } else if (!once) {
            setInView(false)
          }
        },
        { root, rootMargin, threshold },
      )

      observer.observe(node)
    } catch {
      // Fail open: never keep content hidden if observer setup fails (e.g., invalid rootMargin in some browsers)
      setInView(true)
    }

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [node, root, rootMargin, threshold, once])

  return { ref: setRef, inView }
}
