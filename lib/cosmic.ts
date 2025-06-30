import { createBucketClient } from '@cosmicjs/sdk'
import { Movie, Genre, Review, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Helper for handling Cosmic errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all movies with genre information
export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'movies' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Movie[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch movies');
  }
}

// Get featured movies
export async function getFeaturedMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'movies',
        'metadata.featured': true 
      })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Movie[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured movies');
  }
}

// Get single movie by slug
export async function getMovie(slug: string): Promise<Movie | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'movies',
        slug
      })
      .depth(1)
    
    const movie = response.object as Movie;
    
    if (!movie || !movie.metadata) {
      return null;
    }
    
    return movie;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch movie');
  }
}

// Get all genres
export async function getGenres(): Promise<Genre[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'genres' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Genre[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch genres');
  }
}

// Get movies by genre ID
export async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'movies',
        'metadata.genre': genreId
      })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Movie[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch movies by genre');
  }
}

// Get reviews for a specific movie
export async function getMovieReviews(movieId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.movie': movieId
      })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch movie reviews');
  }
}

// Get all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}