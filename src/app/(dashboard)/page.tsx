'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageIcon, Palette, Building2, ArrowRight } from 'lucide-react'
import { useExhibitionStore } from '@/lib/store'

export default function DashboardPage() {
  const { artworks: exhibitionArtworks } = useExhibitionStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your museum artwork exhibitions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/artworks" className="block">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artworks</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Browse</div>
              <p className="text-xs text-muted-foreground">Search museum collections</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/exhibitions" className="block">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Exhibition</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exhibitionArtworks.length}</div>
              <p className="text-xs text-muted-foreground">Artworks selected</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Create your curated exhibition in 3 simple steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
              <div>
                <p className="font-medium">Browse Artworks</p>
                <p className="text-sm text-muted-foreground">Search from Art Institute of Chicago and Cleveland Museum of Art</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <Link href="/artworks">Browse</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
              <div>
                <p className="font-medium">Add to Exhibition</p>
                <p className="text-sm text-muted-foreground">Click "Add to Exhibition" on artworks you want to include</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
              <div>
                <p className="font-medium">View & Manage</p>
                <p className="text-sm text-muted-foreground">View your curated collection in the Exhibitions section</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <Link href="/exhibitions">View</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Connected Museums</CardTitle>
            <CardDescription>
              Free APIs with open access to art collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border">
              <p className="font-medium">Art Institute of Chicago</p>
              <p className="text-sm text-muted-foreground">150,000+ artworks from ancient to contemporary</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium">Cleveland Museum of Art</p>
              <p className="text-sm text-muted-foreground">68,000+ artworks spanning 6,000 years</p>
            </div>
            <div className="pt-2">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/artworks">
                  Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
