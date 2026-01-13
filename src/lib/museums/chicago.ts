const CHICAGO_API = 'https://api.artic.edu/api/v1/artworks'

export interface Artwork {
  id: number
  title: string
  artist_display: string
  date_display: string
  medium_display: string
  dimensions: string
  image_id: string | null
  department_title: string
  artwork_type_title: string
  place_of_origin: string
  description: string | null
  provenance_text: string | null
  gallery_title: string | null
  credit_line: string | null
  is_on_view: boolean
}

export interface ChicagoSearchParams {
  q?: string
  page?: number
  limit?: number
  fields?: string
  query?: string
}

export async function searchChicagoArtworks(params: ChicagoSearchParams = {}): Promise<{ data: Artwork[]; pagination: any; config: any }> {
  const { q = '', page = 1, limit = 20 } = params
  
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    fields: 'id,title,artist_display,date_display,medium_display,dimensions,image_id,department_title,artwork_type_title,place_of_origin,description,provenance_text,gallery_title,credit_line,is_on_view'
  })

  if (q) {
    searchParams.append('q', q)
  }

  const response = await fetch(`${CHICAGO_API}?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Chicago API error: ${response.status}`)
  }

  return response.json()
}

export async function getChicagoArtwork(id: number): Promise<Artwork> {
  const response = await fetch(`${CHICAGO_API}/${id}?fields=id,title,artist_display,date_display,medium_display,dimensions,image_id,department_title,artwork_type_title,place_of_origin,description,provenance_text,gallery_title,credit_line,is_on_view`)

  if (!response.ok) {
    throw new Error(`Chicago API error: ${response.status}`)
  }

  const result = await response.json()
  return result.data
}

export function getChicagoImageUrl(imageId: string, size: 'full' | 'large' | 'medium' | 'small' = 'medium'): string {
  if (!imageId) return '/placeholder-artwork.svg'
  
  const sizes = {
    small: '/full/300,/0/default.jpg',
    medium: '/full/600,/0/default.jpg',
    large: '/full/843,/0/default.jpg',
    full: '/full/max/0/default.jpg'
  }
  
  return `https://www.artic.edu/iiif/2/${imageId}${sizes[size]}`
}
