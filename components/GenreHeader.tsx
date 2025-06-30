// components/GenreHeader.tsx
import { Genre } from '@/types';

interface GenreHeaderProps {
  genre: Genre;
}

export default function GenreHeader({ genre }: GenreHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4 mb-4">
          <div 
            className="w-4 h-16 rounded-full"
            style={{ backgroundColor: genre.metadata.color || '#ffffff' }}
          />
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {genre.metadata.name}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-gray-400 text-lg">Genre</span>
            </div>
          </div>
        </div>
        
        {genre.metadata.description && (
          <p className="text-gray-300 text-lg max-w-2xl">
            {genre.metadata.description}
          </p>
        )}
      </div>
    </div>
  );
}