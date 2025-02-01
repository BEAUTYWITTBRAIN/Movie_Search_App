import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; 
import { Search } from 'lucide-react';
import { Movie, MovieDetails as MovieDetailsType } from './types';
import { MovieCard } from './components/MovieCard';
import { MovieDetails } from './components/MovieDetails';


function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(search)}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);}
        else{
      setError('Failed to fetch movies. Please try again.');
        }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID: string) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      }
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev => {
      const isFavorite = prev.some(m => m.imdbID === movie.imdbID);
      if (isFavorite) {
        return prev.filter(m => m.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}>
      <header className="flex justify-between p-4 items-center">
        <h1 className="text-2xl font-bold">Movie Search</h1>
        {/* Dark mode toggle button with unique styling */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition duration-300 ease-in-out shadow-md 
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
          {darkMode ? (
            <Sun size={26} className="text-yellow-400" /> // Sun icon for light mode with yellow color
          ) : (
            <Moon size={26} className="text-blue-400" /> // Moon icon for dark mode with blue color
          )}
        </button>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for movies..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={true}
                  onFavoriteClick={toggleFavorite}
                  onClick={() => fetchMovieDetails(movie.imdbID)}
                />
              ))}
            </div>
          </div>
        )}

        {movies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
                  onFavoriteClick={toggleFavorite}
                  onClick={() => fetchMovieDetails(movie.imdbID)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            isFavorite={favorites.some(f => f.imdbID === selectedMovie.imdbID)}
            onFavoriteClick={() => toggleFavorite(selectedMovie)}
          />
        )}
      </main>
    </div>
  );
}

export default App;