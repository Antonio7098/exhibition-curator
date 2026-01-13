const HARVARD_API = 'https://api.harvardartmuseums.org'

const HARVARD_API_KEY = process.env.HARVARD_API_KEY || ''

export interface HarvardArtwork {
  id: number
  title: string
  artist_display: string
  dated: string
  medium: string
  dimensions: string
  imageid: number | null
  department: string
  classification: string
  culture: string
  period: string
  provenance_text: string | null
  description: string | null
  gallery_title: string | null
  creditline: string | null
  on_view_status: string | null
}

export interface HarvardSearchParams {
  q?: string
  page?: number
  size?: number
  sort?: string
  sortorder?: 'asc' | 'desc'
  keyword?: string
  century?: string
  culture?: string
  department?: string
}

export async function searchHarvardArtworks(params: HarvardSearchParams = {}): Promise<{ records: HarvardArtwork[]; pagination: any }> {
  const { q = '', page = 1, size = 20, sort = 'rank', sortorder = 'desc' } = params
  
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    sortorder
  })

  if (q) {
    searchParams.append('q', q)
  }

  const response = await fetch(`${HARVARD_API}/objects?${searchParams}`, {
    headers: {
      'Accept': 'application/json',
      ...(HARVARD_API_KEY && { 'apikey': HARVARD_API_KEY })
    }
  })

  if (!response.ok) {
    console.warn(`Harvard API error: ${response.status}${response.status === 401 ? ' - Check HARVARD_API_KEY environment variable' : ''}`)
    return { records: [], pagination: { total: 0, page, size } }
  }

  return response.json()
}

export async function getHarvardArtwork(id: number): Promise<HarvardArtwork> {
  const response = await fetch(`${HARVARD_API}/object/${id}`, {
    headers: {
      'Accept': 'application/json',
      ...(HARVARD_API_KEY && { 'apikey': HARVARD_API_KEY })
    }
  })

  if (!response.ok) {
    throw new Error(`Harvard API error: ${response.status}`)
  }

  return response.json()
}

export function getHarvardImageUrl(imageId: number | null, size: 'full' | 'large' | 'medium' | 'small' = 'medium'): string {
  if (!imageId) return '/placeholder-artwork.svg'
  
  const sizes: Record<string, string> = {
    small: '?height=300',
    medium: '?height=600',
    large: '?height=1000',
    full: ''
  }
  
  return `https://ids.lib.harvard.edu/ids/iiif/${imageId}${sizes[size]}`
}
