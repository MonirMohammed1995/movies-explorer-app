import { useState, useEffect } from 'react';
import { Search, Film, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { fetchMoviesOrShows } from '../services/api';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // প্রতি পেজে কয়টি করে মুভি দেখাবে

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesOrShows(query);
        setMovies(data);
        setCurrentPage(1); // সার্চ বা কুয়েরি বদলালে পেজ ১ এ ফিরে যাবে
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadMovies();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Pagination logic: বর্তমান পেজের জন্য মুভিগুলো কাটছাঁট করে নেওয়া
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // পেজ বদলালে স্ক্রিন উপরে নিয়ে যাবে
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Movie Directory</h1>
          <p className="text-slate-400 text-sm mt-1">Browse all titles or search for your favorite shows instantly.</p>
        </div>

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
      {!loading && !error && currentMovies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onSelect={(m) => setSelectedMovie(m)} 
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-900">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5 px-4">
                <span className="text-sm font-semibold text-white">{currentPage}</span>
                <span className="text-sm text-slate-500">/</span>
                <span className="text-sm text-slate-400">{totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
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