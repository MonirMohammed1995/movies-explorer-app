import { useEffect } from 'react';
import { X, Star, Calendar, Tv, Globe, Clapperboard } from 'lucide-react';

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!movie) return null;

  const rating = movie.rating?.average || 'N/A';
  const premierDate = movie.premiered || 'Unknown';
  const posterUrl = movie.image?.original || movie.image?.medium || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80';
  const networkName = movie.network?.name || movie.webChannel?.name || 'Streaming / Syndicated';
  const officialSite = movie.officialSite || movie.url;
  const cleanSummary = movie.summary ? movie.summary.replace(/<\/?[^>]+(>|$)/g, "") : "No detailed synopsis available for this show.";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
          <img 
            src={posterUrl} 
            alt={movie.name} 
            className="w-full h-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-rose-600 transition-all border border-slate-800 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.genres?.map((genre, idx) => (
                <span key={idx} className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {genre}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {movie.name}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Rating</p>
                <p className="text-sm font-bold text-white">{rating} / 10</p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Release Date</p>
                <p className="text-sm font-bold text-white">{premierDate}</p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Network</p>
                <p className="text-sm font-bold text-white truncate max-w-[140px]">{networkName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clapperboard className="w-4 h-4 text-rose-500" />
              Overview & Summary
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {cleanSummary}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            {officialSite && (
              <a 
                href={officialSite} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Show Webpage</span>
              </a>
            )}
            
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}