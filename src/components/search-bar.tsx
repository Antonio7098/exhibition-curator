'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, ArrowUpDown, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, museum: string, sortBy: string) => void
  loading: boolean
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [museum, setMuseum] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, museum, sortBy)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('', museum, sortBy)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="text"
          placeholder="Search artworks by title, artist, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
          aria-label="Search artworks"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-[140px]" aria-label="Sort results">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="date_asc">Date (Oldest)</SelectItem>
          <SelectItem value="date_desc">Date (Newest)</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>
      <Select value={museum} onValueChange={setMuseum}>
        <SelectTrigger className="w-full sm:w-[200px]" aria-label="Select museum">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Museums" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Museums</SelectItem>
          <SelectItem value="chicago">Art Institute of Chicago</SelectItem>
          <SelectItem value="cleveland">Cleveland Museum of Art</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" disabled={loading} aria-label={loading ? 'Searching...' : 'Search'}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}
