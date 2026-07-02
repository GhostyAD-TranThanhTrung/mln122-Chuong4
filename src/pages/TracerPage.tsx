import { useState, useRef } from 'react';
import { Search, Network, Loader2, AlertCircle, Layers, Camera } from 'lucide-react';
import { useTracer } from '../hooks/useTracer';
import { NetworkGraph } from '../components/NetworkGraph';

export function TracerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [depth, setDepth] = useState<1 | 2>(2);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { state, error, graphData, processText, processImage } = useTracer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPreviewImage(null);
      processText(searchQuery.trim(), depth);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const companyName = await processImage(file);
      if (companyName) {
        setSearchQuery(companyName);
        processText(companyName, depth);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tracer Network</h2>
        <p className="text-slate-600 mb-2">
          Nhập tên công ty, mã chứng khoán hoặc tải lên hình ảnh sản phẩm để AI phân tích chuỗi sở hữu.
        </p>
        <div className="inline-block bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-amber-200/60 shadow-sm">
          <span className="font-bold mr-1">Lưu ý:</span> 
          Dữ liệu được truy xuất theo thời gian thực từ Yahoo Finance, do đó công cụ này chỉ lập được biểu đồ cho các <strong>công ty đại chúng</strong> (đã niêm yết trên sàn chứng khoán).
        </div>
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
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={state === 'searching' || state === 'analyzing'}
            className="flex-none px-4 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50"
            title="Tải ảnh sản phẩm để AI nhận diện thương hiệu"
          >
            <Camera className="w-5 h-5 text-indigo-600" />
          </button>
          
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
            {previewImage && (
              <div className="mb-6 relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin drop-shadow-md" />
                </div>
              </div>
            )}
            {!previewImage && <Loader2 className="w-12 h-12 text-marx-red animate-spin mb-4" />}
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
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <Network className="w-5 h-5 text-marx-red" />
                Mạng lưới sở hữu
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  Cấp độ {depth}
                </span>
              </h3>
              
              {previewImage && (
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white">
                  <img src={previewImage} alt="Product Thumbnail" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {graphData.majorHoldersBreakdown && (
              <div className="absolute bottom-4 right-4 z-10 bg-[#0B0F19] text-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-800 w-max min-w-[320px] text-xs animate-in fade-in slide-in-from-bottom-4 pointer-events-auto">
                <div className="px-4 py-2.5 border-b border-slate-800 bg-[#0B0F19]">
                  <h4 className="font-bold text-sm text-white">Major Holders</h4>
                </div>
                <div className="p-0">
                  <div className="grid grid-cols-[65px_1fr] border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 px-4 py-1.5 bg-[#0B0F19]">
                    <div>Breakdown</div>
                    <div></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="grid grid-cols-[65px_1fr] gap-2 px-4 py-2 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors items-center">
                      <div className="font-bold text-white">{((graphData.majorHoldersBreakdown.insidersPercentHeld || 0) * 100).toFixed(2)}%</div>
                      <div className="text-slate-300 font-medium whitespace-nowrap">% of Shares Held by All Insider</div>
                    </div>
                    <div className="grid grid-cols-[65px_1fr] gap-2 px-4 py-2 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors items-center">
                      <div className="font-bold text-white">{((graphData.majorHoldersBreakdown.institutionsPercentHeld || 0) * 100).toFixed(2)}%</div>
                      <div className="text-slate-300 font-medium whitespace-nowrap">% of Shares Held by Institutions</div>
                    </div>
                    <div className="grid grid-cols-[65px_1fr] gap-2 px-4 py-2 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors items-center">
                      <div className="font-bold text-white">{((graphData.majorHoldersBreakdown.institutionsFloatPercentHeld || 0) * 100).toFixed(2)}%</div>
                      <div className="text-slate-300 font-medium whitespace-nowrap">% of Float Held by Institutions</div>
                    </div>
                    <div className="grid grid-cols-[65px_1fr] gap-2 px-4 py-2 hover:bg-slate-800/50 transition-colors items-center">
                      <div className="font-bold text-white">{graphData.majorHoldersBreakdown.institutionsCount || 0}</div>
                      <div className="text-slate-300 font-medium whitespace-nowrap">Number of Institutions Holding Shares</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <NetworkGraph graphData={graphData} />
          </div>
        )}
      </div>
    </div>
  );
}
