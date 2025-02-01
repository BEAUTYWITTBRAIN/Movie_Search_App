import React from 'react';
import { Heart } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteClick: (movie: Movie) => void;
  onClick: () => void;
}

export function MovieCard({ movie, isFavorite, onFavoriteClick, onClick }: MovieCardProps) {
  return (
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div 
        className="cursor-pointer" 
        onClick={onClick}
      >
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300&h=445'}
          alt={movie.Title}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick(movie);
        }}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Heart
          className={`w-6 h-6 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>
    </div>
  );
}