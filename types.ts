// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
}

// Movie interface
export interface Movie extends CosmicObject {
  type_slug: 'movies';
  metadata: {
    title?: string;
    description?: string;
    youtube_url?: string;
    duration?: string;
    release_year?: number;
    rating?: {
      key: string;
      value: string;
    };
    genre?: Genre;
    featured?: boolean;
    poster_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Genre interface
export interface Genre extends CosmicObject {
  type_slug: 'genres';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type_slug: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: {
      key: string;
      value: string;
    };
    review_text?: string;
    movie?: Movie;
    verified_purchase?: boolean;
  };
}

// Type literals for select-dropdown values
export type MovieRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
export type ReviewRating = '1' | '2' | '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isMovie(obj: CosmicObject): obj is Movie {
  return obj.type_slug === 'movies';
}

export function isGenre(obj: CosmicObject): obj is Genre {
  return obj.type_slug === 'genres';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type_slug === 'reviews';
}