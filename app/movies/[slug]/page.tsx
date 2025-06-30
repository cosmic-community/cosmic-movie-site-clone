import { getMovie, getMovieReviews } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import MovieDetails from '@/components/MovieDetails'
import ReviewSection from '@/components/ReviewSection'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params
  
  const [movie, reviews] = await Promise.all([
    getMovie(slug),
    getMovie(slug).then(movie => 
      movie ? getMovieReviews(movie.id) : []
    )
  ])

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <MovieDetails movie={movie} />
      <ReviewSection 
        reviews={reviews} 
        movieTitle={movie.metadata?.title || movie.title || 'Unknown Movie'} 
      />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const movie = await getMovie(slug)
  
  if (!movie) {
    return {
      title: 'Movie Not Found'
    }
  }

  return {
    title: `${movie.metadata?.title || movie.title} - Netflix Clone`,
    description: movie.metadata?.description || `Watch ${movie.title} and more on Netflix Clone`,
  }
}