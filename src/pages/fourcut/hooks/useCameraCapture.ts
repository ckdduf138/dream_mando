import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '@hooks/useToast'

export const useCameraCapture = (isOpen: boolean) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [starting, setStarting] = useState(false)
  const { showToast } = useToast()

  const canUseCamera = useMemo(() => {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
  }, [])

  useEffect(() => {
    if (!isOpen) return
    if (!canUseCamera) return

    let cancelled = false
    setStarting(true)

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          void videoRef.current.play().catch(() => {
            // Some browsers require explicit user gesture.
          })
        }
      })
      .catch(() => {
        showToast('카메라 권한을 확인해 주세요')
      })
      .finally(() => setStarting(false))

    return () => {
      cancelled = true
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [isOpen, canUseCamera, showToast])

  const captureImage = async (): Promise<Blob | null> => {
    const video = videoRef.current
    if (!video) return null

    const w = video.videoWidth
    const h = video.videoHeight
    if (!w || !h) {
      showToast('카메라 준비 중이에요')
      return null
    }

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      showToast('캡처에 실패했어요')
      return null
    }

    ctx.drawImage(video, 0, 0, w, h)

    const blob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92)
    })

    if (!blob) {
      showToast('캡처에 실패했어요')
      return null
    }

    return blob
  }

  return {
    canUseCamera,
    starting,
    videoRef,
    captureImage,
  }
}
