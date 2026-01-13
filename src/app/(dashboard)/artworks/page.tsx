'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/search-bar'
import { ArtworkCard } from '@/components/artwork-card'
import { ArtworkDetail } from '@/components/artwork-detail'
import { ExhibitionList } from '@/components/exhibition-grid'
import { searchArtworks } from '@/lib/museums'
import { useExhibitionStore } from '@/lib/store'
import type { UnifiedArtwork } from '@/lib/museums'
import { Plus, LayoutGrid, List, Loader2 } from 'lucide-react'

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<UnifiedArtwork[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<UnifiedArtwork | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { artworks: exhibitionArtworks } = useExhibitionStore()

  const handleSearch = useCallback(async (query: string, museum: string, sortBy: string) => {
    setLoading(true)
    try {
      const result = await searchArtworks({ query, museum, sortBy: sortBy as any, limit: 24 })
      setArtworks(result.artworks)
    } catch (error) {
      console.error('Search failed:', error)
      setArtworks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleSearch('', 'all', 'relevance')
  }, [handleSearch])

  const handleViewDetails = (artwork: UnifiedArtwork) => {
    setSelectedArtwork(artwork)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artworks</h1>
          <p className="text-muted-foreground">
            Browse and curate from museum collections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {exhibitionArtworks.length} in exhibition
          </span>
          <Button variant="outline" size="sm">
            <LayoutGrid className="h-4 w-4 mr-1" />
            My Exhibition
          </Button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading ? (
        <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
          <span className="ml-2 text-muted-foreground">Loading artworks...</span>
        </div>
      ) : artworks.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground" role="status">
              Showing {artworks.length} artworks
            </p>
            <div className="flex gap-1" role="group" aria-label="View mode selection">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
              >
                <List className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
            role="list"
            aria-label="Artworks list"
          >
            {artworks.map((artwork) => (
              <div role="listitem" key={artwork.id}>
                <ArtworkCard
                  artwork={artwork}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16" role="status">
          <p className="text-muted-foreground">No artworks found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different search term
          </p>
        </div>
      )}

      <ArtworkDetail
        artwork={selectedArtwork}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}
