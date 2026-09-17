import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Film, Compass, Search, Loader2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { fetchMoviesOrShows } from '../services/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Pagination states for Home page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // হোম পেজে প্রতি পেজে নির্দিষ্ট ৬টি করে কার্ড দেখাবে

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesOrShows(query);
        setMovies(data);
        setCurrentPage(1); // সার্চ কুয়েরি বদলালে পেজ ১ এ রিসেট হবে
      } catch (err) {
        console.error("Failed to load movies:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadMovies();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 500, behavior: 'smooth' }); // কার্ড সেকশনে স্মুথ স্ক্রোল করবে
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-950 text-slate-100">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden py-20 sm:py-28 flex items-center justify-center border-b border-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover object-center opacity-20 scale-105 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.12)_0,transparent_70%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6 z-10 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-rose-400 text-xs font-semibold shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover & Explore Cinematic Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            DISCOVER <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 bg-clip-text text-transparent">MOVIES</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed drop-shadow">
            Explore and discover your favorite movies from around the world instantly.
          </p>

          {/* হোম পেজের সার্চ বার */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-rose-500" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie or show right now..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xl backdrop-blur-md"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Link 
              to="/movies" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 border border-rose-500/30"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Full Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured 6 Movie Cards Section with Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Featured Movies & Shows</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Showing 6 items per page</p>
          </div>
          <Link 
            to="/movies" 
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>View All Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <p className="text-slate-400 text-xs font-medium">Loading featured shows...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && currentMovies.length === 0 && (
          <div className="text-center py-20 space-y-3 bg-slate-900/30 border border-slate-900 rounded-3xl">
            <Film className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">No shows found matching "{query}"</p>
          </div>
        )}

        {/* মুভি গ্রিড ও পেজিনেশন */}
        {!loading && currentMovies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onSelect={(m) => setSelectedMovie(m)} 
                />
              ))}
            </div>

            {/* Pagination Controls for Home */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-slate-900">
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

      </div>

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