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
                1. Tình huống
              </NavItem>
              {/* <NavItem active={activeSection === 2} onClick={() => setActiveSection(2)} icon={<AlertTriangle />}>
                2. Plot Twist
              </NavItem> */}
              <NavItem active={activeSection === 3} onClick={() => setActiveSection(3)} icon={<HelpCircle />}>
                2. Câu hỏi 1: Chế độ tham dự
              </NavItem>
              <NavItem active={activeSection === 4} onClick={() => setActiveSection(4)} icon={<Activity />}>
                3. Câu hỏi 2: Sự tách rời
              </NavItem>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="w-full md:w-3/4">
          <div className="space-y-12">
            {activeSection === 1 && <SituationSection />}
            {activeSection === 2 && <PlotTwistSection />}
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
      <SectionCard title="Bối cảnh: The Big Three là gì?" icon={<Building2 className="text-blue-500" />}>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>The Big Three</strong> của Mỹ gồm <strong>BlackRock, Vanguard (và State Street)</strong> là những tập đoàn tư bản tài chính dưới hình thức tổ chức <strong>Concern</strong> — tổ chức độc quyền đa ngành nắm giữ hàng nghìn xí nghiệp trên toàn cầu.
        </p>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
          <p className="text-sm text-slate-800">
            <strong>Điểm khác biệt:</strong> Thay vì trực tiếp sản xuất hàng hóa (như Samsung, Apple), họ kiểm soát nền kinh tế thông qua <strong>cổ phần thiểu số + chế độ uỷ nhiệm</strong>. Họ gộp tiền từ hàng triệu nhà đầu tư để mua cổ phiếu, giúp họ nắm quyền biểu quyết quan trọng tại các tập đoàn hàng đầu thế giới.
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
        <div className="bg-slate-100 p-5 rounded-xl text-slate-800 text-sm">
          <strong>Hai loại cổ đông, hai mục tiêu:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li><strong>Berkshire Hathaway:</strong> Chỉ nắm giữ Coca-Cola, nên muốn Coca-Cola thắng và thúc đẩy cạnh tranh.</li>
            <li><strong>BlackRock & Vanguard:</strong> Nắm giữ cả hai, muốn cả hai cùng sinh lợi nên <strong>không có động lực tạo áp lực cạnh tranh gay gắt về giá</strong>.</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}

function PlotTwistSection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard title="Sự thật bất ngờ (Plot Twist)" icon={<AlertTriangle className="text-marx-red" />} headerColor="text-marx-red">
        <p className="text-slate-700 leading-relaxed mb-6 font-medium text-lg">
          Nếu Berkshire Hathaway là "đối trọng" duy nhất muốn thúc đẩy cạnh tranh, thì ai đang đứng sau Berkshire Hathaway?
        </p>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <AlertTriangle size={200} />
          </div>
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
            <Shield className="text-amber-400 w-6 h-6" /> Cổ đông lớn nhất của Berkshire Hathaway
          </h4>
          <ul className="space-y-3 mb-6 text-lg relative z-10">
            <li className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-300">BlackRock Inc.</span>
              <span className="font-bold text-amber-400">8.67%</span>
            </li>
            <li className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-300">Vanguard (gồm các quỹ)</span>
              <span className="font-bold text-amber-400">8.40%</span>
            </li>
          </ul>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm relative z-10">
            <strong className="text-amber-400 block mb-1">Ý nghĩa của Plot Twist:</strong>
            <p className="text-slate-200 text-sm leading-relaxed">
              Ngay cả Berkshire Hathaway — cổ đông có động cơ cạnh tranh rõ ràng nhất — cũng nằm trong mạng lưới sở hữu của Big Three (tổng cộng ~17%). "Đối trọng" duy nhất trên bảng cổ đông của Coca-Cola cũng có <strong>chung ông chủ</strong> với chính Big Three.
            </p>
          </div>
        </div>

        <p className="mt-6 text-slate-700 text-center font-medium">
          Mạng lưới sở hữu chéo không chỉ trải ngang (nắm cả hai đối thủ Coke–Pepsi) mà còn <strong>xếp tầng dọc</strong> (nắm luôn cổ đông của cổ đông).
        </p>
      </SectionCard>
    </div>
  );
}

function Question1Section() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl shadow-sm">
        <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 text-lg">
          <HelpCircle className="w-5 h-5" /> Câu hỏi 1: Chế độ tham dự
        </h3>
        <p className="text-indigo-800 font-medium italic">
          Định nghĩa: Chế độ tham dự: Công ty cổ phần phát hành cổ phiếu → vốn phân tán trong tay nhiều cổ đông. Ông chủ lớn chỉ cần nắm một "cổ phần khống chế" (không cần 100%) là đủ để kiểm soát, vì phần còn lại bị phân tán và thiếu phối hợp.
        </p>
      </div>

      <SectionCard title="Cơ chế tham dự phiên bản mới: Cơ chế 3 tầng" icon={<Shuffle className="text-indigo-500" />}>
        <p className="text-slate-700 mb-6 leading-relaxed">
          Cổ phiếu mệnh giá nhỏ phát hành rộng rãi → càng nhiều cổ đông nhỏ → cổ phần bị phân tán hơn → cổ đông lớn cần ít % hơn để khống chế. Bổ sung thêm chế độ uỷ nhiệm: cổ đông nhỏ không đi họp → ủy quyền biểu quyết (BlackRock, Vanguard, StateFarm,...) → đại cổ đông kiểm soát trực tiếp + gián tiếp qua thị trường tài chính.
          <br /><br />
          Cơ chế gồm các tầng đồng thời:
        </p>

        <div className="space-y-4 mb-8">
          <div className="border border-slate-200 p-5 rounded-xl bg-white hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
              Tầng 1: Chế độ uỷ nhiệm (Proxy Voting)
            </h4>
            <p className="text-sm text-slate-600">
              Triệu Nhà đầu tư nhỏ mua cổ phiếu nhưng không đi họp đại hội → uỷ quyền biểu quyết cho BlackRock/Vanguard → 7–8% cổ phần danh nghĩa biến thành ~25% phiếu bầu thực tế tại S&P 500. (Cần fact check)
            </p>
          </div>

          <div className="border border-slate-200 p-5 rounded-xl bg-white hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
              Tầng 2: Sở hữu chéo ngang (Cross-ownership)
            </h4>
            <p className="text-sm text-slate-600">
              BlackRock/Vanguard mua cổ phần tại cả hai đối thủ cạnh tranh cùng lúc (Coke 7.75% + 7.84% = 15.6% và Pepsi 8.25% + 8.92% = 17.2%, tính Vanguard gộp hai pháp nhân). Kết quả: họ không có động lực thúc đẩy cạnh tranh gay gắt vì lợi nhuận đến từ cả hai bên (Cạnh tranh là xung đột lợi ích).
            </p>
          </div>

          <div className="border border-slate-200 p-5 rounded-xl bg-white hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
              Tầng 3 (từ plot twist): Sở hữu xếp tầng dọc
            </h4>
            <p className="text-sm text-slate-600">
              Nắm luôn cổ đông của cổ đông: BlackRock (8.67%) và Vanguard (8.40%) đồng thời là hai cổ đông lớn nhất của chính Berkshire Hathaway. Khi Berkshire nhận cổ tức từ Coke, một phần giá trị đó lại tiếp tục chảy ngược lên Big Three. Hệ quả: bất kỳ "đối trọng" nào xuất hiện ở tầng sở hữu cũng bị hấp thụ vào mạng lưới — dòng cổ tức đi đường nào cuối cùng cũng chảy qua Big Three, và cạnh tranh giữa các cổ đông lớn cũng bị trung hòa giống như cạnh tranh giữa các công ty.
            </p>
          </div>
        </div>

        <h4 className="font-bold text-lg text-slate-900 mb-4 border-b border-slate-200 pb-2">Phân tích từng bước</h4>

        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-indigo-700 mb-1">1. Thu gom vốn</h5>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Triệu người lao động gửi tiết kiệm, quỹ hưu trí vào các quỹ chỉ số của BlackRock và Vanguard. Không ai đủ vốn kiểm soát một tập đoàn lớn, nhưng khi gộp lại rất lớn. Đây là cơ chế "xã hội hóa vốn nhỏ → tập trung quyền kiểm soát lớn".
            </p>
            <div className="bg-slate-50 border-l-2 border-slate-300 pl-3 py-2 text-sm italic text-slate-600">
              "Cổ phiếu có mệnh giá nhỏ được phát hành rộng rãi... nhiều tầng lớp dân cư cũng có thể mua được cổ phiếu và trở thành các cổ đông nhỏ..." - Giáo trình, trang 97
            </div>
          </div>

          <div>
            <h5 className="font-bold text-indigo-700 mb-1">2. Sở hữu chéo — mua cổ phần tại cả hai đối thủ</h5>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              BlackRock và  Vanguard mua cổ phiếu tại hàng nghìn công ty đồng thời, kể cả các đối thủ cạnh tranh trực tiếp. VD: BlackRock nắm cả Coke (7.75%) và Pepsi (8.25%).
              <br> Tuy nhiên BlackRock và Vanguard tương không muốn một trong hai bên thăng</br>
              <br />Big Three nắm cả hai → muốn cả hai ổn định. Đây là "cổ phiếu khống chế" không cần 100%.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Plot twist bổ sung chiều thứ hai của mạng lưới: sở hữu chéo không chỉ theo chiều ngang (Coke–Pepsi) mà còn theo chiều dọc (Big Three → Berkshire → Coke). Ngay cả cổ đông "muốn Coke thắng" cũng gián tiếp làm việc cho Big Three, nên áp lực cạnh tranh từ tầng sở hữu bị triệt tiêu thêm một lần nữa.
            </p>
            <div className="bg-slate-50 border-l-2 border-slate-300 pl-3 py-2 text-sm italic text-slate-600">
              "Các tổ chức độc quyền luôn có xu hướng bành trướng quốc tế... xu hướng vận động của chúng là trở thành các công ty xuyên quốc gia..." - Giáo trình, trang 96
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
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2 text-lg">
          <HelpCircle className="w-5 h-5" /> Câu hỏi 2: Sự tách rời (Kinh tế thực vs ảo)
        </h3>
        <p className="text-amber-800 font-medium italic">
          "Phân tích sự tách rời giữa 'Kinh tế thực' (Sản xuất) và 'Kinh tế ảo' (Tài chính). Tại sao lợi nhuận từ đầu cơ tài chính ngày nay lại lấn át lợi nhuận từ sản xuất kinh doanh?"
        </p>
      </div>

      <SectionCard title="Sự lấn át của tài chính qua 3 bất đối xứng" icon={<TrendingUp className="text-amber-500" />}>
        <p className="text-slate-700 mb-6">
          Tư bản tài chính hiện đại vừa kiểm soát kinh tế thực vừa tách rời khỏi nó nhờ vào ba sự bất đối xứng mang tính cấu trúc:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">1. Thu nhập bất đối xứng</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kinh tế thực kiếm tiền từ bán hàng. Kinh tế ảo (như BlackRock) kiếm tiền từ phí quản lý tính trên tổng tài sản (AUM), thu khoảng 21 tỷ USD mỗi năm, bất kể sản xuất thực bán được nhiều hay ít.
              <br /><br />
              <em>"Tách rời hoàn toàn giữa tài chính và sản xuất thực."</em>
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">2. Rủi ro bất đối xứng</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nhà máy thất bại thì phá sản. Nhưng các tập đoàn tài chính lớn khi thất bại sẽ được nhà nước cứu trợ bằng tiền thuế (Bảo hiểm ngầm). VD: Citigroup (45 tỷ USD), AIG (150 tỷ USD) năm 2008.
              <br /><br />
              <em>"Lợi nhuận tư nhân hóa, tổn thất xã hội hóa."</em>
            </p>
          </div>

          <div className="md:col-span-2 bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2 text-lg">3. Mâu thuẫn cơ bản của CNTB</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Sản xuất ngày càng xã hội hóa (hàng triệu người đóng góp tạo ra giá trị), nhưng tích lũy giá trị thặng dư ngày càng tập trung vào thiểu số tư bản tài chính.
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm italic text-slate-700">
                  Khi bạn uống lon Coke: tiền từ bạn → Coke → cổ tức → Big Three (chế độ uỷ nhiệm). Song song đó, Big Three còn thu phí quản lý từ việc nắm giữ cổ phần Coke. Đây là cách tư bản tài chính hiện đại vừa kiểm soát kinh tế thực vừa tách rời khỏi nó.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
