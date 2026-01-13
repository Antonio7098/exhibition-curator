'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArtworkDetail } from '@/components/artwork-detail'
import { ExhibitionGrid } from '@/components/exhibition-grid'
import { useExhibitionStore } from '@/lib/store'
import { Trash2, Share2, Loader2 } from 'lucide-react'
import type { UnifiedArtwork } from '@/lib/museums'

export default function ExhibitionsPage() {
  const { artworks, removeArtwork, clearExhibition } = useExhibitionStore()
  const [selectedArtwork, setSelectedArtwork] = useState<UnifiedArtwork | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleViewDetails = (artwork: UnifiedArtwork) => {
    setSelectedArtwork(artwork)
    setDetailOpen(true)
  }

  const handleShare = async () => {
    const shareData = {
      title: 'My Virtual Exhibition',
      text: `Check out my curated exhibition with ${artworks.length} artworks!`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Exhibition</h1>
          <p className="text-muted-foreground">
            Your curated collection of artworks
          </p>
        </div>
        {artworks.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        )}
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground mb-2">Your exhibition is empty</p>
          <p className="text-sm text-muted-foreground mb-4">
            Browse the artwork collections and add pieces to create your virtual exhibition
          </p>
          <Button asChild>
            <a href="/artworks">Browse Artworks</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">{artworks.length}</span> {artworks.length === 1 ? 'artwork' : 'artworks'} in your exhibition
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearExhibition}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>

          <ExhibitionGrid
            artworks={artworks}
            onRemove={removeArtwork}
            onViewDetails={handleViewDetails}
          />
        </>
      )}

      <ArtworkDetail
        artwork={selectedArtwork}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}
