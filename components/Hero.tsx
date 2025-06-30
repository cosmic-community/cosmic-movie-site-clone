import { Movie } from '@/types'
import { Play, Info } from 'lucide-react'
import Link from 'next/link'

interface HeroProps {
  movie: Movie
}

export default function Hero({ movie }: HeroProps) {
  const backgroundImage = movie.metadata?.poster_image?.imgix_url
  
  return (
    <div className="relative h-screen flex items-center">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage}?w=1920&h=1080&fit=crop&auto=format,compress)`
          }}
        >
          <div className="absolute inset-0 netflix-gradient" />
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.metadata?.title || movie.title}
          </h1>
          
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            {movie.metadata?.description}
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            {movie.metadata?.release_year && (
              <span className="text-white font-semibold">
                {movie.metadata.release_year}
              </span>
            )}
            
            {movie.metadata?.rating?.value && (
              <span className="px-2 py-1 bg-gray-700 text-white text-sm rounded">
                {movie.metadata.rating.value}
              </span>
            )}
            
            {movie.metadata?.duration && (
              <span className="text-gray-300">
                {movie.metadata.duration}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors">
              <Play className="h-5 w-5 fill-current" />
              <span>Play</span>
            </button>
            
            <Link 
              href={`/movies/${movie.slug}`}
              className="flex items-center space-x-2 bg-gray-600 bg-opacity-70 text-white px-6 py-3 rounded font-semibold hover:bg-opacity-50 transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}