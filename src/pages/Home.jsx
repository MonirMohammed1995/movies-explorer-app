import { Link } from 'react-router-dom';
import { Sparkles, Film, Compass, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden py-24 sm:py-36 flex items-center justify-center border-b border-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.12)_0,transparent_70%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-rose-400 text-xs font-semibold shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to MovieExplorer Cinematic Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            DISCOVER <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 bg-clip-text text-transparent">MOVIES</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            Explore and discover your favorite movies from around the world with instant search and detailed insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              to="/movies" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-base shadow-2xl shadow-rose-600/40 transition-all hover:scale-105 active:scale-95 border border-rose-500/30"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Now</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold text-lg">Extensive Library</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Browse through an extensive database spanning multiple genres, ratings, and release dates.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold text-lg">Instant Search</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Quickly find specific titles by searching in real-time with responsive API queries.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold text-lg">Interactive Modals</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Click any movie card to inspect comprehensive synopses, rating scores, and metadata.</p>
          </div>
        </div>
      </div>
    </div>
  );
}