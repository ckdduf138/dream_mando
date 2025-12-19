import { createContext, useContext } from 'react'

export type FontStatus = {
  showText: boolean
  fontReady: boolean
}

const FontStatusContext = createContext<FontStatus>({ showText: true, fontReady: true })

export const FontStatusProvider = FontStatusContext.Provider

export const useFontsReady = (): boolean => {
  return useContext(FontStatusContext).showText
}

export const useFontStatus = (): FontStatus => {
  return useContext(FontStatusContext)
}
