const FONT_FAMILY = 'OngleipParkDahyeon'
const FONT_TEST = `1em ${FONT_FAMILY}`
const ONGLEIP_FONT_URL =
  'https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2'

let loadAttempt: Promise<boolean> | null = null

export const areFontsReady = (): boolean => {
  return document.fonts?.check?.(FONT_TEST) ?? true
}

export const loadFonts = async (): Promise<boolean> => {
  if (areFontsReady()) return true
  if (loadAttempt) return loadAttempt

  loadAttempt = (async () => {
    try {
      const font = new FontFace(FONT_FAMILY, `url(${ONGLEIP_FONT_URL})`, {
        weight: '400',
        style: 'normal',
      })

      const loaded = await font.load()
      document.fonts.add(loaded)
      await document.fonts.ready
      return areFontsReady()
    } catch {
      return false
    }
  })()

  return loadAttempt
}
