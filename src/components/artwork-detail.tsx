'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, MapPin, Calendar, Palette, Info } from 'lucide-react'
import type { UnifiedArtwork } from '@/lib/museums'
import { useExhibitionStore } from '@/lib/store'

interface ArtworkDetailProps {
  artwork: UnifiedArtwork | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArtworkDetail({ artwork, open, onOpenChange }: ArtworkDetailProps) {
  const { addArtwork, removeArtwork, isInExhibition } = useExhibitionStore()

  if (!artwork) return null

  const inExhibition = isInExhibition(artwork.id)

  const handleToggleExhibition = () => {
    if (inExhibition) {
      removeArtwork(artwork.id)
    } else {
      addArtwork(artwork)
    }
  }

  const museumUrl = artwork.source === 'chicago'
    ? `https://www.artic.edu/artworks/${artwork.originalId}`
    : `https://www.clevelandart.org/art/${artwork.originalId}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{artwork.title}</DialogTitle>
          <DialogDescription className="sr-only">Artwork details</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={artwork.source === 'chicago'}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{artwork.artist}</h3>
              <p className="text-muted-foreground">{artwork.date}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {artwork.source === 'chicago' ? 'Art Institute of Chicago' : 'Harvard Art Museums'}
              </Badge>
              {artwork.classification && <Badge variant="outline">{artwork.classification}</Badge>}
              {artwork.culture && <Badge variant="outline">{artwork.culture}</Badge>}
              {artwork.isOnView && <Badge>On View</Badge>}
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Palette className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Medium</p>
                  <p className="text-muted-foreground">{artwork.medium}</p>
                </div>
              </div>

              {artwork.dimensions && (
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">Dimensions</p>
                    <p className="text-muted-foreground">{artwork.dimensions}</p>
                  </div>
                </div>
              )}

              {artwork.origin && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">Place of Origin</p>
                    <p className="text-muted-foreground">{artwork.origin}</p>
                  </div>
                </div>
              )}

              {artwork.department && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-muted-foreground">{artwork.department}</p>
                  </div>
                </div>
              )}
            </div>

            {artwork.description && (
              <>
                <Separator />
                <div>
                  <p className="font-medium mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">{artwork.description}</p>
                </div>
              </>
            )}

            {artwork.gallery && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Gallery</p>
                <p className="text-sm text-muted-foreground">{artwork.gallery}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                variant={inExhibition ? 'default' : 'outline'}
                onClick={handleToggleExhibition}
                className="flex-1"
              >
                {inExhibition ? 'Remove from Exhibition' : 'Add to Exhibition'}
              </Button>
              <Button variant="outline" asChild>
                <a href={museumUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View at Museum
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
