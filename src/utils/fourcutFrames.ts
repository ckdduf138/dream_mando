export type FourCutRect = {
  leftPct: number
  topPct: number
  widthPct: number
  heightPct: number
}

export type FourCutFrameConfig = {
  id: string
  name: string
  aspectRatio: number
  frameSrc: string
  slots: FourCutRect[]
}

export const FOURCUT_FRAMES: FourCutFrameConfig[] = [
  {
    id: 'basic',
    name: '기본',
    aspectRatio: 1 / 3,
    frameSrc: '/fourcut/basic/frame.jpg',
    slots: [
      { leftPct: 9, topPct: 10, widthPct: 82, heightPct: 20.5 },
      { leftPct: 9, topPct: 31, widthPct: 82, heightPct: 20.5 },
      { leftPct: 9, topPct: 52, widthPct: 82, heightPct: 20.5 },
      { leftPct: 9, topPct: 73, widthPct: 82, heightPct: 20.5 },
    ],
  },
]

export const getFourCutFrameById = (frameId: string | undefined): FourCutFrameConfig | null => {
  if (!frameId) return null
  return FOURCUT_FRAMES.find((f) => f.id === frameId) ?? null
}
