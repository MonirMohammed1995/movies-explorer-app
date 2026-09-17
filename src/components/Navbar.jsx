import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Film, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition-colors font-medium text-sm px-3 py-2 rounded-lg flex items-center gap-1.5 ${
      isActive 
        ? 'text-rose-400 bg-rose-500/10 font-semibold' 
        : 'text-slate-300 hover:text-white hover:bg-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/25 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Movie<span className="text-rose-500">Explorer</span>
            </span>
            <span className="block text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Cinematic Hub</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/movies" className={navLinkClass}>Movies & Shows</NavLink>
          
          <NavLink to="/movies" className="relative ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-sm shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Sparkles className="w-4 h-4" />
            <span>Explore Now</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900">
            Home
          </Link>
          <Link to="/movies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900">
            Movies & Shows Listing
          </Link>
          <div className="pt-2">
            <Link to="/movies" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white font-medium text-sm shadow-md shadow-rose-600/30">
              <Sparkles className="w-4 h-4" />
              <span>Explore Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}