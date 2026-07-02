import { Link } from 'react-router-dom';
import { Search, Network, Info, Target } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-marx-red/10 p-2 rounded-xl group-hover:bg-marx-red/20 transition-colors">
            <Network className="w-6 h-6 text-marx-red" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-marx-red transition-colors">
            Tiền Chảy Về Đâu?
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/theory" className="text-sm font-medium text-slate-600 hover:text-primary-600 flex items-center gap-2 transition-colors">
            <Info className="w-4 h-4" />
            Lý luận
          </Link>
          <Link to="/situation" className="text-sm font-medium text-slate-600 hover:text-primary-600 flex items-center gap-2 transition-colors">
            <Target className="w-4 h-4" />
            Tình huống
          </Link>
          <Link to="/tracer" className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 flex items-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <Search className="w-4 h-4" />
            Bắt đầu phân tích
          </Link>
        </div>
      </div>
    </nav>
  );
}
