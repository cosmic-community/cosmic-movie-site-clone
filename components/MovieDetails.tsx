// components/MovieDetails.tsx
import { Movie } from '@/types';

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl = movie.metadata.poster_image?.imgix_url;
  const genreColor = movie.metadata.genre?.metadata?.color || '#ffffff';

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            {posterUrl && (
              <img
                src={`${posterUrl}?w=600&h=900&fit=crop&auto=format,compress`}
                alt={movie.metadata.title}
                width={300}
                height={450}
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
              />
            )}
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              {movie.metadata.genre && (
                <div 
                  className="w-2 h-12 rounded-full"
                  style={{ backgroundColor: genreColor }}
                />
              )}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {movie.metadata.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  {movie.metadata.release_year && (
                    <span className="text-lg">{movie.metadata.release_year}</span>
                  )}
                  {movie.metadata.rating?.value && (
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">
                      {movie.metadata.rating.value}
                    </span>
                  )}
                  {movie.metadata.duration && (
                    <span className="text-lg">{movie.metadata.duration}</span>
                  )}
                  {movie.metadata.genre && (
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${genreColor}20`,
                        color: genreColor 
                      }}
                    >
                      {movie.metadata.genre.metadata.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 max-w-3xl">
              {movie.metadata.description}
            </p>

            {/* YouTube Trailer */}
            {movie.metadata.youtube_url && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Watch Trailer</h3>
                <div className="aspect-video max-w-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(movie.metadata.youtube_url)}`}
                    title={`${movie.metadata.title} Trailer`}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}