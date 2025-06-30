import { Movie } from '@/types'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterImage = movie.metadata?.poster_image?.imgix_url
  
  return (
    <Link href={`/movies/${movie.slug}`} className="group">
      <div className="relative aspect-[2/3] bg-netflix-gray rounded-lg overflow-hidden transition-transform group-hover:scale-105">
        {posterImage ? (
          <img
            src={`${posterImage}?w=400&h=600&fit=crop&auto=format,compress`}
            alt={movie.metadata?.title || movie.title}
            className="w-full h-full object-cover"
            width={200}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-netflix-gray">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {movie.metadata?.featured && (
          <div className="absolute top-2 left-2">
            <div className="bg-netflix-red text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity flex items-end">
          <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="font-semibold text-sm mb-1">
              {movie.metadata?.title || movie.title}
            </h3>
            
            <div className="flex items-center space-x-2 text-xs">
              {movie.metadata?.release_year && (
                <span>{movie.metadata.release_year}</span>
              )}
              
              {movie.metadata?.rating?.value && (
                <span className="px-1 py-0.5 bg-gray-700 rounded">
                  {movie.metadata.rating.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}