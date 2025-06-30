// app/genres/[slug]/page.tsx
import { getGenres, getMoviesByGenre } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import MovieGrid from '@/components/MovieGrid'
import GenreHeader from '@/components/GenreHeader'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function GenrePage({ params }: PageProps) {
  const { slug } = await params
  const genres = await getGenres()
  const genre = genres.find(g => g.slug === slug)
  
  if (!genre) {
    notFound()
  }

  const movies = await getMoviesByGenre(genre.id)

  return (
    <div className="min-h-screen bg-black">
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <GenreHeader genre={genre} />
          
          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p className="text-gray-400 text-center py-12">
              No movies found in this genre yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const genres = await getGenres()
  const genre = genres.find(g => g.slug === slug)
  
  if (!genre) {
    return {
      title: 'Genre Not Found'
    }
  }

  return {
    title: `${genre.metadata?.name || genre.title} Movies - Netflix Clone`,
    description: genre.metadata?.description || `Browse ${genre.title} movies on Netflix Clone`,
  }
}