import React from 'react';
import { X, Heart } from 'lucide-react';
import { MovieDetails as MovieDetailsType } from '../types';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

export function MovieDetails({ movie, onClose, isFavorite, onFavoriteClick }: MovieDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="md:flex">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300&h=445'}
              alt={movie.Title}
              className="w-full md:w-[300px] h-[445px] object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold">{movie.Title}</h2>
                <button
                  onClick={onFavoriteClick}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">{movie.Plot}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Year</h3>
                    <p>{movie.Year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Runtime</h3>
                    <p>{movie.Runtime}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Director</h3>
                    <p>{movie.Director}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">IMDb Rating</h3>
                    <p>{movie.imdbRating}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Genre</h3>
                  <p>{movie.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Cast</h3>
                  <p>{movie.Actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}