import { Link } from 'react-router-dom';
import { ArrowRight, Database, Network, TrendingUp } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Giải mã <span className="text-marx-red">Tư bản Tài chính</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Ứng dụng minh họa trực quan "chế độ tham dự" và "sự thống trị của tài phiệt" theo học thuyết Kinh tế Chính trị Mác - Lênin. Khám phá mạng lưới sở hữu thực sự đứng sau mọi sản phẩm bạn tiêu dùng.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
        <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Dữ liệu thực tế</h3>
          <p className="text-slate-600">Trích xuất từ OpenCorporates - cơ sở dữ liệu doanh nghiệp mở lớn nhất thế giới.</p>
        </div>
        
        <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-red-100 text-marx-red rounded-xl flex items-center justify-center mb-6">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Chế độ tham dự</h3>
          <p className="text-slate-600">Trực quan hóa các tầng lớp công ty mẹ, quỹ đầu tư và sự kiểm soát chéo.</p>
        </div>

        <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Tài phiệt chi phối</h3>
          <p className="text-slate-600">Làm rõ cách một lượng vốn nhỏ có thể kiểm soát một chuỗi giá trị khổng lồ.</p>
        </div>
      </div>

      <Link 
        to="/tracer" 
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-marx-red font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marx-red hover:bg-red-700 hover:shadow-xl hover:-translate-y-1"
      >
        Khởi động Tracer
        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
