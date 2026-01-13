import { searchChicagoArtworks, getChicagoArtwork, getChicagoImageUrl, type Artwork as ChicagoArtwork } from './chicago'
import { searchClevelandArtworks, getClevelandArtwork, getClevelandImageUrl, type ClevelandArtwork } from './cleveland'

export type MuseumSource = 'chicago' | 'cleveland'

export interface UnifiedArtwork {
  id: string
  source: MuseumSource
  title: string
  artist: string
  date: string
  medium: string
  dimensions: string
  imageUrl: string
  department: string
  classification: string
  culture: string
  origin: string
  description: string
  provenance: string | null
  gallery: string | null
  creditLine: string | null
  isOnView: boolean
  originalId: number
}

function transformChicagoArtwork(artwork: ChicagoArtwork): UnifiedArtwork {
  return {
    id: `chicago-${artwork.id}`,
    source: 'chicago',
    title: artwork.title || 'Unknown Title',
    artist: artwork.artist_display || 'Unknown Artist',
    date: artwork.date_display || 'Unknown Date',
    medium: artwork.medium_display || 'Unknown Medium',
    dimensions: artwork.dimensions || 'Unknown Dimensions',
    imageUrl: artwork.image_id ? getChicagoImageUrl(artwork.image_id, 'medium') : '/placeholder-artwork.svg',
    department: artwork.department_title || '',
    classification: artwork.artwork_type_title || '',
    culture: '',
    origin: artwork.place_of_origin || '',
    description: artwork.description?.replace(/<[^>]*>/g, '') || '',
    provenance: artwork.provenance_text,
    gallery: artwork.gallery_title,
    creditLine: artwork.credit_line,
    isOnView: artwork.is_on_view,
    originalId: artwork.id
  }
}

function transformClevelandArtwork(artwork: ClevelandArtwork): UnifiedArtwork {
  return {
    id: `cleveland-${artwork.id}`,
    source: 'cleveland',
    title: artwork.title || 'Unknown Title',
    artist: artwork.creators?.[0]?.name || 'Unknown Artist',
    date: artwork.creation_date || 'Unknown Date',
    medium: artwork.medium || 'Unknown Medium',
    dimensions: artwork.dimensions || 'Unknown Dimensions',
    imageUrl: artwork.images ? getClevelandImageUrl(artwork.images) : '/placeholder-artwork.svg',
    department: artwork.department_title || '',
    classification: artwork.type || '',
    culture: artwork.culture || '',
    origin: '',
    description: artwork.description?.replace(/<[^>]*>/g, '') || '',
    provenance: artwork.provenance,
    gallery: artwork.gallery_title,
    creditLine: artwork.accession_number,
    isOnView: artwork.is_on_view,
    originalId: artwork.id
  }
}

export interface SearchOptions {
  query?: string
  museum?: MuseumSource | 'all'
  page?: number
  limit?: number
  sortBy?: 'relevance' | 'date_asc' | 'date_desc' | 'title'
}

function sortArtworks(artworks: UnifiedArtwork[], sortBy: string): UnifiedArtwork[] {
  const sorted = [...artworks]
  
  switch (sortBy) {
    case 'date_asc':
      return sorted.sort((a, b) => {
        const dateA = parseDate(a.date)
        const dateB = parseDate(b.date)
        return (dateA || 0) - (dateB || 0)
      })
    case 'date_desc':
      return sorted.sort((a, b) => {
        const dateA = parseDate(a.date)
        const dateB = parseDate(b.date)
        return (dateB || 0) - (dateA || 0)
      })
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'relevance':
    default:
      return sorted
  }
}

function parseDate(dateStr: string): number | null {
  if (!dateStr) return null
  const match = dateStr.match(/\d{4}/)
  if (match) {
    return parseInt(match[0], 10)
  }
  return null
}

export async function searchArtworks(options: SearchOptions = {}): Promise<{ artworks: UnifiedArtwork[]; total: number; page: number; source: string }> {
  const { query = '', museum = 'all', page = 1, limit = 20, sortBy = 'relevance' } = options

  if (museum === 'all') {
    const [chicagoResult, clevelandResult] = await Promise.allSettled([
      searchChicagoArtworks({ q: query, page, limit: Math.ceil(limit / 2) }),
      searchClevelandArtworks({ q: query, page, limit: Math.ceil(limit / 2) })
    ])

    let artworks: UnifiedArtwork[] = []

    if (chicagoResult.status === 'fulfilled') {
      artworks.push(...chicagoResult.value.data.map(transformChicagoArtwork))
    }

    if (clevelandResult.status === 'fulfilled') {
      artworks.push(...clevelandResult.value.data.map(transformClevelandArtwork))
    }

    artworks = sortArtworks(artworks, sortBy)

    return {
      artworks,
      total: artworks.length,
      page,
      source: 'all'
    }
  }

  if (museum === 'chicago') {
    const result = await searchChicagoArtworks({ q: query, page, limit })
    const artworks = sortArtworks(result.data.map(transformChicagoArtwork), sortBy)
    return {
      artworks,
      total: result.pagination.total,
      page,
      source: 'chicago'
    }
  }

  const result = await searchClevelandArtworks({ q: query, page, limit })
  const artworks = sortArtworks(result.data.map(transformClevelandArtwork), sortBy)
  return {
    artworks,
    total: result.info?.total_count || result.data.length,
    page,
    source: 'cleveland'
  }
}

export async function getArtwork(id: string): Promise<UnifiedArtwork | null> {
  const [source, originalId] = id.split('-')

  if (source === 'chicago') {
    try {
      const artwork = await getChicagoArtwork(parseInt(originalId))
      return transformChicagoArtwork(artwork)
    } catch {
      return null
    }
  }

  if (source === 'cleveland') {
    try {
      const artwork = await getClevelandArtwork(parseInt(originalId))
      return transformClevelandArtwork(artwork)
    } catch {
      return null
    }
  }

  return null
}
