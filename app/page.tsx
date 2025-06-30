import { getMovies, getFeaturedMovies, getGenres } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'
import GenreFilter from '@/components/GenreFilter'

export default async function Home() {
  const [movies, featuredMovies, genres] = await Promise.all([
    getMovies(),
    getFeaturedMovies(),
    getGenres()
  ])

  const heroMovie = featuredMovies[0] || movies[0]

  return (
    <div className="min-h-screen bg-black">
      {heroMovie && <Hero movie={heroMovie} />}
      
      <div className="px-4 py-8 space-y-8">
        <div className="max-w-7xl mx-auto">
          <GenreFilter genres={genres} />
          
          {featuredMovies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Movies</h2>
              <MovieGrid movies={featuredMovies} />
            </section>
          )}
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">All Movies</h2>
            <MovieGrid movies={movies} />
          </section>
        </div>
      </div>
    </div>
  )
}