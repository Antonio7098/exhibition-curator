'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Check, Eye, ExternalLink } from 'lucide-react'
import type { UnifiedArtwork } from '@/lib/museums'
import { useExhibitionStore } from '@/lib/store'

interface ArtworkCardProps {
  artwork: UnifiedArtwork
  onViewDetails: (artwork: UnifiedArtwork) => void
}

export function ArtworkCard({ artwork, onViewDetails }: ArtworkCardProps) {
  const { addArtwork, removeArtwork, isInExhibition } = useExhibitionStore()
  const inExhibition = isInExhibition(artwork.id)

  const handleToggleExhibition = () => {
    if (inExhibition) {
      removeArtwork(artwork.id)
    } else {
      addArtwork(artwork)
    }
  }

  const sourceLabel = artwork.source === 'chicago' ? 'Art Institute of Chicago' : 'Cleveland Art'

  return (
    <article className="overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border bg-card">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={artwork.imageUrl}
          alt={`Artwork: ${artwork.title} by ${artwork.artist}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized={artwork.source === 'chicago'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => onViewDetails(artwork)}
          aria-label={`View details for ${artwork.title}`}
        >
          <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
          View
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 text-sm mb-1">{artwork.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{artwork.artist}</p>
        <p className="text-xs text-muted-foreground">{artwork.date}</p>
        <div className="flex flex-wrap gap-1 mt-2" role="list" aria-label="Artwork labels">
          <Badge variant="secondary" className="text-xs" role="listitem">
            {sourceLabel}
          </Badge>
          {artwork.isOnView && (
            <Badge variant="outline" className="text-xs" role="listitem">
              On View
            </Badge>
          )}
        </div>
      </div>
      <CardFooter className="p-4 pt-0">
        <Button
          variant={inExhibition ? 'default' : 'outline'}
          size="sm"
          className="w-full"
          onClick={handleToggleExhibition}
          aria-pressed={inExhibition}
        >
          {inExhibition ? (
            <>
              <Check className="h-4 w-4 mr-1" aria-hidden="true" />
              In Exhibition
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
              Add to Exhibition
            </>
          )}
        </Button>
      </CardFooter>
    </article>
  )
}
