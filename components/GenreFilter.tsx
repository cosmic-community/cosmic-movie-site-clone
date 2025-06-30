'use client'

import { Genre } from '@/types'
import Link from 'next/link'

interface GenreFilterProps {
  genres: Genre[]
}

export default function GenreFilter({ genres }: GenreFilterProps) {
  if (!genres.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">Browse by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.slug}`}
            className="px-4 py-2 rounded-full text-white font-medium transition-colors hover:opacity-80"
            style={{ 
              backgroundColor: genre.metadata?.color || '#333333'
            }}
          >
            {genre.metadata?.name || genre.title}
          </Link>
        ))}
      </div>
    </div>
  )
}