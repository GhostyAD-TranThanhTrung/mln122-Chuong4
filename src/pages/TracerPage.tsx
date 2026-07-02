import { useState, useRef } from 'react';
import { Search, Network, Loader2, AlertCircle, Layers } from 'lucide-react';
import { useTracer } from '../hooks/useTracer';
import { NetworkGraph } from '../components/NetworkGraph';

export function TracerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [depth, setDepth] = useState<1 | 2>(2);
  const { state, error, graphData, processText, processImage } = useTracer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      processText(searchQuery.trim(), depth);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tracer Network</h2>
        <p className="text-slate-600">Nhập tên công ty hoặc mã chứng khoán để phân tích chuỗi sở hữu (ví dụ: Apple, Coca Cola, AAPL, KO...).</p>
      </div>

      <div className="glass rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-marx-red focus:border-transparent transition-all shadow-sm"
            placeholder="Ví dụ: Apple, Coca Cola, AAPL, KO..."
          />
        </div>

        {/* Depth Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1 flex-shrink-0">
          <Layers className="w-4 h-4 text-slate-500 ml-1.5" />
          {([1, 2] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDepth(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                depth === d
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Cấp độ {d}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleSearch}
            disabled={state !== 'idle' && state !== 'success' && state !== 'error'}
            className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span className="md:hidden lg:inline">Tìm kiếm</span>
          </button>
        </div>
      </div>

      <div className="flex-grow glass rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative">
        {state === 'idle' && (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Network className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-700 mb-2">Chưa có dữ liệu</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Hãy tìm kiếm một công ty để hệ thống truy xuất dữ liệu sở hữu thực tế.
            </p>
          </div>
        )}

        {(state === 'searching' || state === 'analyzing') && (
          <div className="text-center p-8 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-marx-red animate-spin mb-4" />
            <h3 className="text-xl font-medium text-slate-700 mb-2">Đang xử lý...</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              {state === 'searching' && 'Đang tra cứu dữ liệu doanh nghiệp...'}
              {state === 'analyzing' && `Đang phân tích chuỗi sở hữu (cấp độ ${depth})...`}
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="text-center p-8 text-red-600">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Lỗi xử lý</h3>
            <p className="text-sm max-w-sm mx-auto">{error}</p>
          </div>
        )}

        {state === 'success' && graphData && (
          <div className="w-full h-full p-2 flex flex-col relative bg-white">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <Network className="w-5 h-5 text-marx-red" />
                Mạng lưới sở hữu
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  Cấp độ {depth}
                </span>
              </h3>
            </div>
            <NetworkGraph graphData={graphData} />
          </div>
        )}
      </div>
    </div>
  );
}
