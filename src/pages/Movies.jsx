import { useState, useEffect } from 'react';
import { Search, Film, AlertCircle, Loader2 } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { fetchMoviesOrShows } from '../services/api'; // আলাদা করা API ফাইল ইমপোর্ট করা হলো

export default function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesOrShows(query);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search query to optimize network requests
    const timer = setTimeout(() => {
      loadMovies();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Movie Directory</h1>
          <p className="text-slate-400 text-sm mt-1">Browse all titles or search for your favorite shows instantly.</p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie or show..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading cinematic database...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl flex items-center gap-3 text-rose-400">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">Failed to load content</h3>
            <p className="text-xs text-rose-300 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-32 space-y-3">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-white font-semibold text-lg">No movies found</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            We couldn't find any shows matching "{query}". Try checking your spelling or searching for another title.
          </p>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onSelect={(m) => setSelectedMovie(m)} 
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

    </div>
  );
}