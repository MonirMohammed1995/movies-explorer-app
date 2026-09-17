import { Star, Calendar, Info } from 'lucide-react';

export default function MovieCard({ movie, onSelect }) {
  const rating = movie.rating?.average || 'N/A';
  const premierYear = movie.premiered ? movie.premiered.substring(0, 4) : 'TBA';
  const posterUrl = movie.image?.medium || movie.image?.original || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80';
  const genres = movie.genres || [];

  return (
    <div className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 flex flex-col">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img 
          src={posterUrl} 
          alt={movie.name} 
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-amber-400 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>

        {genres.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
            {genres.slice(0, 2).map((genre, idx) => (
              <span key={idx} className="bg-slate-900/90 backdrop-blur-sm text-slate-300 text-[10px] px-2 py-0.5 rounded font-medium border border-slate-800">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="font-semibold text-white text-base line-clamp-1 group-hover:text-rose-400 transition-colors">
            {movie.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{premierYear}</span>
            </div>
            {movie.language && (
              <span>• {movie.language}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelect(movie)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all duration-200 active:scale-95"
        >
          <Info className="w-4 h-4" />
          <span>See Details</span>
        </button>
      </div>
    </div>
  );
}