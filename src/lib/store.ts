import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UnifiedArtwork } from './museums'

interface ExhibitionState {
  artworks: UnifiedArtwork[]
  addArtwork: (artwork: UnifiedArtwork) => boolean
  removeArtwork: (id: string) => void
  clearExhibition: () => void
  isInExhibition: (id: string) => boolean
  getExhibitionSize: () => number
}

export const useExhibitionStore = create<ExhibitionState>()(
  persist(
    (set, get) => ({
      artworks: [],

      addArtwork: (artwork) => {
        const current = get().artworks
        if (current.some(a => a.id === artwork.id)) {
          return false
        }
        set({ artworks: [...current, artwork] })
        return true
      },

      removeArtwork: (id) => {
        set({ artworks: get().artworks.filter(a => a.id !== id) })
      },

      clearExhibition: () => {
        set({ artworks: [] })
      },

      isInExhibition: (id) => {
        return get().artworks.some(a => a.id === id)
      },

      getExhibitionSize: () => {
        return get().artworks.length
      }
    }),
    {
      name: 'exhibition-storage'
    }
  )
)
