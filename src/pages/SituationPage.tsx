import React, { useState } from 'react';
import { ChevronRight, Target, AlertTriangle, HelpCircle, Activity, Building2, Shuffle, Users, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { NetworkGraph } from '../components/NetworkGraph';
import type { TracerGraph } from '../types';

const cocaColaGraphData: TracerGraph = {
  nodes: [
    { id: 'Coca-Cola', label: 'Coca-Cola', type: 'brand', description: 'Company' },
    { id: 'Berkshire Hathaway', label: 'Berkshire Hathaway, Inc', type: 'fund', description: 'Nắm giữ 9.30%' },
    { id: 'BlackRock', label: 'Blackrock Inc.', type: 'fund', description: 'Nắm giữ 7.75%' },
    { id: 'Vanguard', label: 'Vanguard', type: 'fund', description: 'Nắm giữ 7.84%' }
  ],
  links: [
    { source: 'Berkshire Hathaway', target: 'Coca-Cola', label: '9.30%' },
    { source: 'BlackRock', target: 'Coca-Cola', label: '7.75%' },
    { source: 'Vanguard', target: 'Coca-Cola', label: '7.84%' }
  ]
};

const pepsiGraphData: TracerGraph = {
  nodes: [
    { id: 'Pepsi', label: 'PepsiCo', type: 'brand', description: 'Company' },
    { id: 'BlackRock', label: 'Blackrock Inc.', type: 'fund', description: 'Nắm giữ 8.25%' },
    { id: 'Vanguard', label: 'Vanguard', type: 'fund', description: 'Nắm giữ 8.92%' }
  ],
  links: [
    { source: 'BlackRock', target: 'Pepsi', label: '8.25%' },
    { source: 'Vanguard', target: 'Pepsi', label: '8.92%' }
  ]
};

const ultimateGraphData: TracerGraph = {
  nodes: [
    { id: 'Investors', label: 'Hàng triệu NĐT', type: 'brand', description: 'Ủy quyền' },
    { id: 'BlackRock', label: 'Blackrock Inc.', type: 'fund', description: 'The Big Three' },
    { id: 'Vanguard', label: 'Vanguard', type: 'fund', description: 'The Big Three' },
    { id: 'Berkshire', label: 'Berkshire Hathaway', type: 'fund', description: 'Cổ đông lớn' },
    { id: 'Coca-Cola', label: 'Coca-Cola', type: 'brand', description: 'Sản xuất' },
    { id: 'Pepsi', label: 'PepsiCo', type: 'brand', description: 'Sản xuất' }
  ],
  links: [
    { source: 'Investors', target: 'BlackRock', label: 'Ủy nhiệm' },
    { source: 'Investors', target: 'Vanguard', label: 'Ủy nhiệm' },

    { source: 'BlackRock', target: 'Coca-Cola', label: '7.75%' },
    { source: 'BlackRock', target: 'Pepsi', label: '8.25%' },
    { source: 'BlackRock', target: 'Berkshire', label: '8.67%' },

    { source: 'Vanguard', target: 'Coca-Cola', label: '7.84%' },
    { source: 'Vanguard', target: 'Pepsi', label: '8.92%' },
    { source: 'Vanguard', target: 'Berkshire', label: '8.40%' },

    { source: 'Berkshire', target: 'Coca-Cola', label: '9.30%' }
  ]
};

export function SituationPage() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-4xl mx-auto mb-16 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Tình huống thực tế: BlackRock và Vanguard
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          Trường hợp nghiên cứu về sở hữu tại Coca-Cola và Pepsi.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-28 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 px-2 text-lg">Nội dung phân tích</h3>
            <nav className="space-y-1">
              <NavItem active={activeSection === 1} onClick={() => setActiveSection(1)} icon={<Target />}>
                1. Tình huống & Yêu cầu
              </NavItem>
              <NavItem active={activeSection === 2} onClick={() => setActiveSection(2)} icon={<Building2 />}>
                2. Bối cảnh: The Big Three
              </NavItem>
              <NavItem active={activeSection === 3} onClick={() => setActiveSection(3)} icon={<HelpCircle />}>
                3. Câu hỏi 1: Chế độ tham dự
              </NavItem>
              <NavItem active={activeSection === 4} onClick={() => setActiveSection(4)} icon={<Activity />}>
                4. Câu hỏi 2: Sự tách rời
              </NavItem>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="w-full md:w-3/4">
          <div className="space-y-12">
            {activeSection === 1 && <SituationSection />}
            {activeSection === 2 && <BigThreeSection />}
            {activeSection === 3 && <Question1Section />}
            {activeSection === 4 && <Question2Section />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ active, onClick, children, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${active
        ? 'bg-marx-red text-white shadow-md font-semibold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
      <div className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      {children}
      {active && <ChevronRight className="ml-auto w-4 h-4 opacity-70" />}
    </button>
  );
}

function SectionCard({ title, icon, children, headerColor = "text-slate-900" }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className={`text-2xl font-extrabold tracking-tight ${headerColor}`}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SituationSection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard title="Tình huống thực tiễn" icon={<Target className="text-marx-red" />}>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-800 text-lg leading-relaxed mb-8">
          <p className="mb-4 font-medium text-marx-red text-xl">
            Có một sự thật thú vị: Khi uống Coca-Cola hay Pepsi, lợi nhuận cuối cùng đều chảy về túi các cổ đông lớn nhất.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-base text-slate-700">
            <li>
              Thực tế, hai quỹ đầu tư BlackRock và Vanguard đang nắm giữ cổ phần chi phối tại hầu hết các công ty trong Top 500 thế giới (S&P 500), kể cả các đối thủ cạnh tranh trực tiếp của nhau.
            </li>
          </ul>
          <p className="mt-4 italic font-medium text-slate-600">
            Có vẻ như sự cạnh tranh giữa Coca và Pepsi chỉ là "bề nổi", còn ông chủ thực sự ở phía sau (Giới đầu sỏ tài chính) thì nắm trọn cả hai đầu.
          </p>
        </div>

        <h4 className="font-bold text-xl text-slate-900 mb-4 border-b border-slate-200 pb-2">Vậy Có 2 Câu Hỏi</h4>

        <div className="space-y-4 mb-8">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            <h5 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> Chế độ tham dự
            </h5>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <h5 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Sự tách rời
            </h5>
            <p className="text-emerald-800 text-sm">
              Phân tích sự tách rời giữa "Kinh tế thực" (Sản xuất) và "Kinh tế ảo" (Tài chính). Tại sao lợi nhuận từ đầu cơ tài chính ngày nay lại lấn át lợi nhuận từ sản xuất kinh doanh?
            </p>
          </div>
        </div>

      </SectionCard>
    </div>
  );
}

function BigThreeSection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard title="Bối cảnh: The Big Three là gì?" icon={<Building2 className="text-blue-500" />}>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>The Big Three</strong> của Mỹ gồm <strong>BlackRock, Vanguard (và State Street)</strong> là những tập đoàn tư bản tài chính.
        </p>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
          <p className="text-sm text-slate-800">
            Thay vì trực tiếp sản xuất hàng hóa (như Samsung, Apple), họ kiểm soát nền kinh tế thông qua <strong>cổ phần thiểu số + chế độ uỷ nhiệm</strong>. Họ gộp tiền từ hàng triệu nhà đầu tư để mua cổ phiếu, giúp họ nắm quyền biểu quyết quan trọng tại các tập đoàn hàng đầu thế giới.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Đối tượng phân tích: Coca-Cola & Pepsi" icon={<Target className="text-green-500" />}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Theo số liệu từ Yahoo Finance (giả định 31/3/2026), chúng ta thấy sự xuất hiện của BlackRock và Vanguard (và State Street) tại hai đối thủ lớn nhất ngành giải khát:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm h-[450px] flex flex-col bg-white">
            <div className="bg-red-50 text-red-800 font-bold p-3 text-center border-b border-slate-200 shrink-0">
              Cổ đông lớn tại Coca-Cola
            </div>
            <div className="flex-1 w-full relative">
              <NetworkGraph graphData={cocaColaGraphData} r1={160} interactive={false} />
            </div>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm h-[450px] flex flex-col bg-white">
            <div className="bg-blue-50 text-blue-800 font-bold p-3 text-center border-b border-slate-200 shrink-0">
              Cổ đông lớn tại Pepsi
            </div>
            <div className="flex-1 w-full relative">
              <NetworkGraph graphData={pepsiGraphData} r1={160} interactive={false} />
            </div>
          </div>
        </div>
        <div className="bg-slate-100 p-5 rounded-xl text-slate-800 text-sm mt-6 border-l-4 border-slate-400">
          <p className="mb-2">
            <strong>Theo lý thuyết Mác–Lênin</strong> — đây chính là biểu hiện của <strong>TƯ BẢN TÀI CHÍNH</strong>: sự hợp nhất giữa tư bản ngân hàng và tư bản công nghiệp.
          </p>
          <p>
            <strong>Điểm then chốt:</strong> không phải cạnh tranh biến mất — mà cạnh tranh đã bị kiểm soát. Lợi nhuận từ cả hai phía đều chảy về cùng một nhóm cổ đông lớn.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}



function Question1Section() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard title="Câu hỏi 1: Chế độ tham dự" icon={<Shuffle className="text-indigo-500" />}>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 mb-2 text-lg">1. Sự biến đổi của Chế độ tham dự</h4>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-3 mb-3 italic text-slate-700 text-sm">
              "Cổ phiếu có mệnh giá nhỏ được phát hành rộng rãi... nhiều tầng lớp dân cư cũng có thể mua được cổ phiếu và trở thành các cổ đông nhỏ..." - Giáo trình, trang 97
            </div>
            <p className="text-slate-700 leading-relaxed">
              <strong>Thực tế:</strong> Coca-Cola có ~4,3 tỷ cổ phiếu. Hàng triệu nhà đầu tư là cổ đông nhỏ, làm vốn bị phân tán cực độ.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl h-[600px] flex flex-col bg-slate-900/5 relative group">
            <div className="absolute top-0 left-0 right-0 bg-indigo-600/90 backdrop-blur text-white font-bold p-4 text-center border-b border-indigo-700/50 z-10 shadow-md">
              Mạng lưới Sở hữu 3 tầng: Tách rời Quyền lực và Cổ phần
            </div>
            <div className="flex-1 w-full relative pt-12">
              <NetworkGraph graphData={ultimateGraphData} r1={160} interactive={true} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 text-sm text-slate-700 shadow-lg pointer-events-none">
              <strong className="text-indigo-700">Tầng 1:</strong> NĐT nhỏ lẻ uỷ nhiệm → <strong className="text-indigo-700">Tầng 2:</strong> BlackRock và Vanguard nắm quyền biểu quyết → <strong className="text-indigo-700">Tầng 3:</strong> Sở hữu chéo & xếp tầng kiểm soát hoàn toàn thị trường.
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2 text-lg">2. Bổ sung "Chế độ uỷ nhiệm"</h4>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-3 mb-3 italic text-slate-700 text-sm">
              "'Chế độ tham dự' được bổ sung thêm bằng 'chế độ uỷ nhiệm', nghĩa là những đại cổ đông được 'uỷ nhiệm' thay mặt cho đa số cổ đông có ít cổ phiếu..." - Giáo trình, trang 97
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Triệu NĐT nhỏ <strong>không có động lực đi họp</strong> (quyền bị bỏ không dùng).</li>
              <li>Họ uỷ nhiệm biểu quyết cho các quỹ lớn (BlackRock, Vanguard).</li>
              <li>Tại đại hội (tính trên số phiếu thực tế), <strong>BlackRock/Vanguard bỏ phiếu gần 100%</strong>. Dù chỉ nắm ~15% cổ phần thực tế, quyền lực của họ áp đảo hoàn toàn.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2 text-lg">3. Mạng lưới sở hữu chéo & Xếp tầng</h4>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-3 mb-3 italic text-slate-700 text-sm">
              "Các tổ chức độc quyền luôn có xu hướng bành trướng quốc tế... xu hướng vận động của chúng là trở thành các công ty xuyên quốc gia..." - Giáo trình, trang 96
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-4">
              <li><strong>Nắm cả hai đối thủ:</strong> BlackRock/Vanguard nắm Coke (15.6%) và Pepsi (17.2%) → Không có động lực thúc đẩy cạnh tranh gay gắt.</li>
              <li><strong>Nắm luôn cổ đông lớn:</strong> Berkshire Hathaway là cổ đông riêng lẻ lớn nhất của Coke, nhưng gần 1/5 cổ phiếu Berkshire lại nằm trong tay BlackRock và Vanguard.</li>
            </ul>
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-800 font-medium italic mb-2">
                "Các chủ sở hữu lớn giờ đây vừa khống chế trực tiếp vừa khống chế gián tiếp thông qua biến động trên thị trường tài chính, buộc các nhà quản lý phải tuân theo lợi ích của chúng." - Giáo trình, trang 97
              </p>
              <p className="text-slate-700 text-sm">
                → Cạnh tranh không hề biến mất, mà là <strong>cạnh tranh được kiểm soát</strong> bởi các công ty tài chính.
              </p>
            </div>
          </div>
        </div>


      </SectionCard>
    </div>
  );
}

function Question2Section() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard title="Câu hỏi 2: Sự tách rời (Kinh tế thực vs ảo)" icon={<TrendingUp className="text-amber-500" />}>


        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
              Thu nhập tài chính không gắn với sản xuất
            </h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Có một nghịch lý đang xảy ra trong kinh tế hiện đại. Người công nhân dậy lúc 5 giờ sáng, làm 8 tiếng, tạo ra hàng hóa thực sự. Đó là Kinh tế thực.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cùng lúc đó — một quỹ đầu tư ngồi ở New York nhấn nút mua bán cổ phiếu. Chưa tạo ra một sản phẩm nào. Chưa thuê một nhân công nào. Nhưng lợi nhuận thu về có thể gấp 10 lần người công nhân đó. Đó là Kinh tế ảo — nơi tiền đẻ ra tiền, tách hoàn toàn khỏi giá trị lao động thực.
            </p>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-4 italic text-slate-700">
              "Xu thế trì trệ của nền kinh tế hay xu thế kìm hãm là do sự thống trị của độc quyền đã tạo ra những nhân tố ngăn cản sự tiến bộ kỹ thuật và phát triển sản xuất." - Giáo trình, trang 103
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
              Rủi ro bất đối xứng — tài chính được nhà nước bảo hiểm ngầm
            </h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700 mb-4">
              <li>Nhà máy Coke thất bại → phá sản.</li>
              <li>Citigroup thất bại → nhà nước bơm 45 tỷ USD và bảo lãnh 301 tỷ USD tài sản độc hại.</li>
              <li>AIG đã được Chính phủ Mỹ giải cứu hai lần bằng tổng số tiền lên tới 150 tỷ USD trong năm 2008.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Điều này tạo lợi thế cạnh tranh không công bằng: tài chính có thể chấp nhận rủi ro mà sản xuất thông thường không thể. Đổi lại, Chính phủ Mỹ đã kiểm soát mức cổ phần gần 80% của hãng bảo hiểm này.
            </p>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-4 italic text-slate-700">
              "Chính phủ Mỹ nâng cổ phần nắm giữ trong Citigroup lên mức 36%. Citigroup đã được Chính phủ Mỹ bơm cho 45 tỷ USD và bảo lãnh cho 301 tỷ USD tài sản độc hại. AIG đã được Chính phủ Mỹ giải cứu hai lần bằng tổng số tiền lên tới 150 tỷ USD trong năm 2008." - Giáo trình, trang 100
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
              Mâu thuẫn cơ bản — sản xuất xã hội hóa, tích lũy tư nhân hóa
            </h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Hàng triệu công nhân Coke và Pepsi tạo ra giá trị thực; nhưng phần lớn giá trị thặng dư bị tư bản tài chính chiếm đoạt qua cổ tức và tăng giá cổ phiếu — mà không cần đặt một viên gạch xây nhà máy.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Đây chính là mâu thuẫn cơ bản: sản xuất ngày càng xã hội hóa, nhưng quyền chiếm hữu thành quả ngày càng tập trung.
            </p>

            <div className="mt-8 mb-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="p-4 font-bold w-1/4">Tiêu chí</th>
                    <th className="p-4 font-bold border-l border-slate-200 w-3/8">Kinh tế thực (Sản xuất)</th>
                    <th className="p-4 font-bold border-l border-slate-200 w-3/8">Kinh tế ảo (Tài chính)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50">Hoạt động cốt lõi</td>
                    <td className="p-4 border-l border-slate-200">Sản xuất hàng hóa, cung cấp dịch vụ (VD: Công nhân nhà máy)</td>
                    <td className="p-4 border-l border-slate-200">Mua bán tài sản, thu phí quản lý (VD: Quỹ đầu tư)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50">Nguồn gốc thu nhập</td>
                    <td className="p-4 border-l border-slate-200">Bán sản phẩm/dịch vụ (Gắn liền với giá trị tạo ra)</td>
                    <td className="p-4 border-l border-slate-200">Phí Tài sản đang quản lí, cổ tức, chênh lệch giá (Tách rời sản xuất)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50">Mức độ rủi ro</td>
                    <td className="p-4 border-l border-slate-200">Tự chịu 100% rủi ro (Phá sản nếu thất bại)</td>
                    <td className="p-4 border-l border-slate-200 text-marx-red font-medium">Bảo hiểm ngầm từ Nhà nước ("Lợi nhuận tư nhân hóa, tổn thất xã hội hóa")</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50">Sự phân phối</td>
                    <td className="p-4 border-l border-slate-200">Xã hội hóa cao (Triệu người đóng góp)</td>
                    <td className="p-4 border-l border-slate-200 text-amber-700 font-medium">Tư nhân hóa cao (Tập trung vào tay số ít tư bản tài chính)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-900 mb-2">Tóm lại:</h5>
              <p className="text-slate-700 leading-relaxed">
                Khi bạn uống lon Coke: tiền từ bạn → Coke → cổ tức → tập đoàn tư bản tài chính. Song song đó, tập đoàn tư bản tài chính còn thu phí quản lý từ việc nắm giữ cổ phần Coke — bất kể bạn có mua lon nào hay không. Đây là cách tư bản tài chính hiện đại vừa kiểm soát kinh tế thực vừa tách rời khỏi nó.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
