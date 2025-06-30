import { Movie } from '@/types'
import MovieCard from '@/components/MovieCard'

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No movies available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}