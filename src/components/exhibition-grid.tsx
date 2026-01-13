'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, ExternalLink, MapPin, Calendar } from 'lucide-react'
import { useExhibitionStore } from '@/lib/store'
import type { UnifiedArtwork } from '@/lib/museums'

interface ExhibitionGridProps {
  artworks: UnifiedArtwork[]
  onRemove: (id: string) => void
  onViewDetails: (artwork: UnifiedArtwork) => void
}

export function ExhibitionGrid({ artworks, onRemove, onViewDetails }: ExhibitionGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Your exhibition is empty</p>
        <p className="text-sm text-muted-foreground">
          Search and add artworks to create your curated collection
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {artworks.map((artwork) => {
        const museumUrl = artwork.source === 'chicago'
          ? `https://www.artic.edu/artworks/${artwork.originalId}`
          : `https://www.clevelandart.org/art/${artwork.originalId}`

        return (
          <Card key={artwork.id} className="overflow-hidden group">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                unoptimized={artwork.source === 'chicago'}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onViewDetails(artwork)}
                >
                  View Details
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemove(artwork.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-1 text-sm mb-1">{artwork.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{artwork.artist}</p>
              <p className="text-xs text-muted-foreground">{artwork.date}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {artwork.source === 'chicago' ? 'Chicago' : 'Cleveland'}
                </Badge>
                {artwork.isOnView && (
                  <Badge variant="outline" className="text-xs">On View</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function ExhibitionList() {
  const { artworks, removeArtwork, clearExhibition } = useExhibitionStore()

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground mb-2">No artworks in your exhibition</p>
        <p className="text-sm text-muted-foreground">
          Browse the collections and add artworks to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'} in your exhibition
        </p>
        <Button variant="outline" size="sm" onClick={clearExhibition}>
          Clear All
        </Button>
      </div>
      <ExhibitionGrid
        artworks={artworks}
        onRemove={removeArtwork}
        onViewDetails={() => {}}
      />
    </div>
  )
}
