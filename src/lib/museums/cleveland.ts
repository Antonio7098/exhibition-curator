const CLEVELAND_API = 'https://openaccess-api.clevelandart.org/api/artworks'

export interface ClevelandArtwork {
  id: number
  title: string
  creators: { name: string; role: string }[] | null
  creation_date: string
  medium: string
  dimensions: string
  images: { web: { url: string } }[] | null
  department_title: string
  type: string
  culture: string | null
  provenance: string | null
  description: string | null
  gallery_title: string | null
  accession_number: string
  is_on_view: boolean
}

export interface ClevelandSearchParams {
  q?: string
  page?: number
  limit?: number
  skip?: number
}

export async function searchClevelandArtworks(params: ClevelandSearchParams = {}): Promise<{ data: ClevelandArtwork[]; info: { total_count: number; skip: number; limit: number } }> {
  const { q = '', page = 1, limit = 20 } = params
  const skip = (page - 1) * limit

  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString()
  })

  if (q) {
    searchParams.append('q', q)
  }

  const response = await fetch(`${CLEVELAND_API}?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Cleveland API error: ${response.status}`)
  }

  return response.json()
}

export async function getClevelandArtwork(id: number): Promise<ClevelandArtwork> {
  const response = await fetch(`${CLEVELAND_API}/${id}`)

  if (!response.ok) {
    throw new Error(`Cleveland API error: ${response.status}`)
  }

  return response.json()
}

export function getClevelandImageUrl(images: ClevelandArtwork['images']): string {
  if (!images || images.length === 0) return '/placeholder-artwork.svg'
  const firstImage = images[0]
  if (!firstImage?.web?.url) return '/placeholder-artwork.svg'
  return firstImage.web.url
}
