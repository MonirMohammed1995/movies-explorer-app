import { Film } from 'lucide-react';
import { FaFacebook, FaGithub, FaReact, FaTv } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { MdMovie } from 'react-icons/md';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiReactrouter } from 'react-icons/si';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">MovieExplorer</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your ultimate cinematic destination to explore, search, and discover thousands of TV shows and movies globally powered by TVMaze API.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-rose-400 transition-colors flex justify-start items-center gap-2"><IoHome className="w-5 h-5"/>Home Landing</Link></li>
              <li><Link to="/movies" className="hover:text-rose-400 transition-colors flex justify-start items-center gap-2"><MdMovie className="w-5 h-5"/>Movie Directory</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Technologies</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-4 justify-start items-center"><FaReact className="w-5 h-5"/>React & <SiReactrouter className="w-5 h-5"/> React Router</li>
              <li className="flex gap-4 justify-start items-center"><RiTailwindCssFill className="w-5 h-5"/>Tailwind CSS</li>
              <li className="flex gap-4 justify-start items-center"><FaTv className="w-5 h-5"/>TVMaze REST API</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MovieExplorer. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="https://github.com/MonirMohammed1995" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/monirmdnayem/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}