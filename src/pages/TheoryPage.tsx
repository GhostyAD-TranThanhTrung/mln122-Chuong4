import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Building2, Briefcase, HandCoins, Network, Users, Shield, Globe } from 'lucide-react';
import { StateMonopolyChart } from '../components/StateMonopolyChart';

export function TheoryPage() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-4xl mx-auto mb-16 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Biểu hiện mới của độc quyền & độc quyền nhà nước
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          Vai trò lịch sử của chủ nghĩa tư bản trong điều kiện ngày nay.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-28 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 px-2 text-lg">Mục lục</h3>
            <nav className="space-y-1">
              <NavItem active={activeSection === 1} onClick={() => setActiveSection(1)} icon={<Building2 />}>
                4.3.1. Độc quyền
              </NavItem>
              <NavItem active={activeSection === 2} onClick={() => setActiveSection(2)} icon={<Network />}>
                4.3.2. Độc quyền nhà nước
              </NavItem>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="w-full md:w-3/4">
          <div className="space-y-12">
            {activeSection === 1 && <MonopolySection />}
            {activeSection === 2 && <StateMonopolySection />}
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
        active 
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

function MonopolySection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard 
        title="4.3.1.1. Biểu hiện mới của tích tụ và tập trung tư bản" 
        icon={<Building2 className="text-blue-500" />}
      >
        <p className="text-slate-700 leading-relaxed mb-4">
          Do sự phát triển của Lực lượng sản xuất (LLSX) và Khoa học & Công nghệ (KH&CN), 2 Hình thức tổ chức độc quyền mới ra đời:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Concern (Consơn)</h4>
            <p className="text-sm text-slate-700">Là tổ chức độc quyền đa ngành, thành phần có hàng trăm xí nghiệp có quan hệ với những ngành khác nhau & được phân bố ở nhiều nước.</p>
          </div>
          <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2">Conglomerate (Công-gơ-lô-mê-rết)</h4>
            <p className="text-sm text-slate-700">Là sự kết hợp của hàng chục những hãng vừa và nhỏ không có sự liên quan trực tiếp về sản xuất hoặc dịch vụ cho sản xuất.</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-500" /> Vai trò của Doanh nghiệp vừa và nhỏ
          </h4>
          <p className="text-slate-700 mb-4">Bên cạnh các tổ chức độc quyền lớn lại xuất hiện nhiều doanh nghiệp vừa và nhỏ có vai trò quan trọng:</p>
          <ul className="space-y-2 text-sm text-slate-600 ml-4 list-disc marker:text-marx-red">
            <li><strong>Sự phụ thuộc:</strong> Các doanh nghiệp vừa và nhỏ phụ thuộc vào các công nghệ và sở hữu trí tuệ của các Concern và Conglomerate (vd: quan hệ Android). Các độc quyền lớn mở rộng kiểm soát SX nói chung, tiến bộ KH&CN nói riêng.</li>
            <li><strong>Thế mạnh:</strong>
              <ul className="ml-5 mt-2 space-y-1 list-circle marker:text-slate-400">
                <li>Nhạy cảm với thay đổi trong SX.</li>
                <li>Linh hoạt ứng phó với sự biến động của thị trường.</li>
                <li>Mạnh dạn đầu tư vào những ngành mới đòi hỏi sự mạo hiểm.</li>
                <li>Dễ đổi mới trang thiết bị, kỹ thuật mà không cần nhiều chi phí bổ sung.</li>
              </ul>
            </li>
          </ul>
        </div>
      </SectionCard>

      <SectionCard 
        title="4.3.1.2. Biểu hiện về vai trò của tư bản tài chính" 
        icon={<HandCoins className="text-amber-500" />}
      >
        <p className="text-slate-700 leading-relaxed mb-6">
          Từ cuối thế kỷ XX đến nay, tư bản tài chính đã có sự thay đổi và có những biểu hiện mới. Nội dung của sự liên kết giữa các ngành trở nên đa dạng hơn, tinh vi hơn và phức tạp hơn:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass p-5 rounded-xl border border-slate-200">
            <h5 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider text-amber-600">Công - Nông - Thương - Tín - Dịch vụ</h5>
            <ul className="space-y-2 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Tập đoàn Vingroup</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Tập đoàn TH (TH group)</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Tập đoàn Nestlé</li>
            </ul>
          </div>
          <div className="glass p-5 rounded-xl border border-slate-200">
            <h5 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider text-amber-600">Công nghiệp - Quân sự - Dịch vụ quốc phòng</h5>
            <ul className="space-y-2 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Tập đoàn hàng không và vũ trụ Boeing</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Samsung Heavy Industries</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red"/> Mitsubishi Heavy Industries</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl">
          <h4 className="font-bold text-lg mb-4 text-amber-400">Chế độ tham dự & Sự khống chế của đại cổ đông</h4>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            Cổ phiếu mệnh giá nhỏ được phát hành rộng rãi. "Chế độ tham dự" được bổ sung thêm bằng "chế độ uỷ nhiệm", nghĩa là những đại cổ đông thay mặt cho đa số các cổ đông nhỏ quyết định (ví dụ: BlackRock, Vanguard).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h5 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-green-400"/> Khống chế trực tiếp</h5>
              <ul className="text-xs text-slate-300 space-y-1 list-disc ml-4">
                <li>Quyền biểu quyết lớn</li>
                <li>Bầu Hội đồng quản trị</li>
                <li>Bổ nhiệm CEO, Thay đổi chiến lược</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h5 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400"/> Khống chế gián tiếp</h5>
              <p className="text-xs text-slate-300">Bán tháo cổ phiếu làm giá giảm mạnh, dẫn đến các nhà đầu tư khác bán theo. Gây áp lực lớn lên ban lãnh đạo qua thị trường tài chính.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard 
        title="4.3.1.3. Biểu hiện mới của xuất khẩu tư bản" 
        icon={<Globe className="text-emerald-500" />}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoBlock title="Hướng xuất khẩu mới" number="1">
            Trước kia: Từ nước tư bản phát triển → nước kém phát triển.<br/>
            Hiện nay: Giữa các nước tư bản phát triển với nhau. Do KHKT và vốn lớn, thu lợi nhuận cao, ít rủi ro chính trị.
          </InfoBlock>
          <InfoBlock title="Vai trò của TNCs" number="2">
            Vai trò của các công ty xuyên quốc gia (TNCs) ngày càng lớn, đặc biệt là đầu tư trực tiếp nước ngoài (FDI).
          </InfoBlock>
          <InfoBlock title="Hình thức mới (BOT, BT)" number="3">
            Sự đan xen giữa xuất khẩu tư bản và xuất khẩu hàng hóa tăng lên (xây dựng - kinh doanh - chuyển giao BOT, BT). Kết hợp hợp đồng dịch vụ, chất xám.
          </InfoBlock>
          <InfoBlock title="Nguyên tắc cùng có lợi" number="4">
            Sự áp đặt mang tính chất thực dân trong xuất khẩu tư bản đã được gỡ bỏ dần, đề cao nguyên tắc cùng có lợi trong đầu tư.
          </InfoBlock>
        </div>
      </SectionCard>

      <SectionCard 
        title="4.3.1.4. Phân chia thị trường thế giới" 
        icon={<Users className="text-purple-500" />}
      >
        <ul className="space-y-4 text-slate-700">
          <li className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="mt-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
            <div>
              <strong>Toàn cầu hóa & Chủ nghĩa tư bản độc quyền quốc tế:</strong> Sức mạnh và phạm vi bành trướng của TNCs tăng lên thúc đẩy quốc tế hoá, toàn cầu hoá kinh tế.
            </div>
          </li>
          <li className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="mt-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
            <div>
              <strong>Khu vực hoá kinh tế:</strong> Hình thành các liên minh kinh tế khu vực như EU (Châu Âu), NAFTA (Bắc Mỹ).
            </div>
          </li>
          <li className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="mt-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
            <div>
              <strong>Sự tham gia của các nước đang phát triển:</strong> Nhằm chống sức ép cường quốc, họ thành lập OPEC, MERCOSUS, FTA, CU... 
              <p className="mt-2 text-marx-red font-semibold text-sm">=&gt; Tư bản độc quyền quốc tế đang chi phối toàn cầu hoá & ra sức hạn chế sự phát triển của các tổ chức khu vực.</p>
            </div>
          </li>
        </ul>
      </SectionCard>
    </div>
  );
}

function StateMonopolySection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard 
        title="4.3.2. Biểu hiện mới của độc quyền nhà nước dưới CNTB" 
        icon={<Shield className="text-marx-red" />}
      >
        <p className="text-slate-700 mb-6 font-medium">
          Trực quan hóa cấu trúc 3 trụ cột của Độc quyền nhà nước:
        </p>
        
        <div className="w-full h-[600px] mb-12 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner bg-slate-50">
          <StateMonopolyChart />
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">4.3.2.1. Cơ chế quan hệ nhân sự</h4>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-700 mb-4">
                Các nhóm tư bản chia sẻ quyền lực (cơ chế thỏa hiệp), không có thế lực độc quyền nào nắm hết quyền lực tuyệt đối. Thể hiện rõ qua các cuộc bầu cử và lập pháp.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <strong className="text-sm text-slate-900 block mb-2">VD: Bầu cử Đức 2021 (Liên minh đèn giao thông)</strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Đảng Dân chủ Xã hội (25.7%)</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Đảng Xanh (14.7%)</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span> Đảng Dân chủ tự do (11.4%)</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Không đảng nào quá bán, cùng chia sẻ quản lý đất nước.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <strong className="text-sm text-slate-900 block mb-2">VD: Thương lượng Luật lao động</strong>
                  <p className="text-xs text-slate-600">Doanh nghiệp muốn giảm chi phí, Công đoàn muốn tăng lương, Nhà nước muốn ổn định xã hội. Kết quả: Luật là sản phẩm thương lượng thỏa hiệp, không bên nào thắng tuyệt đối.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">4.3.2.2. Sở hữu nhà nước</h4>
            <ul className="space-y-4 text-slate-700">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <strong>Phân chia quyền lực tài chính:</strong> Quốc hội (lập pháp) quyết định chi tiêu, Chính phủ (hành pháp) không được tự ý xài tiền. Ngân sách ưu tiên chống lạm phát, thất nghiệp.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <strong>Gánh vác rủi ro:</strong> Cơ sở vật chất (đường xá, y tế), R&D nhiều rủi ro, sinh lời chậm do Nhà nước lo để doanh nghiệp tập trung ngành hấp dẫn.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <strong>Cứu trợ khủng hoảng:</strong> Bơm vốn, mua cổ phần cứu doanh nghiệp (VD: AIG được Mỹ giải cứu 150 tỷ USD năm 2008, nhà nước kiểm soát 80% để ngăn sụp đổ dây chuyền).
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">4.3.2.3. Vai trò công cụ điều tiết kinh tế</h4>
            <div className="bg-slate-900 text-white p-6 rounded-xl">
              <p className="text-slate-300 mb-4">
                Đa đảng nhưng chỉ hoạt động khi không thay đổi hệ thống. Nếu có nguy cơ mất kiểm soát, nhà nước dùng biện pháp mạnh (thiết quân luật, đảo chính).
              </p>
              <div className="bg-slate-800 p-4 rounded-lg mb-4 border-l-4 border-marx-red">
                <strong className="text-white block mb-1">Ví dụ: Chile 1973</strong>
                <p className="text-sm text-slate-400">Tổng thống Allende quốc hữu hóa công nghiệp trái ý lập pháp. Ngày 11/9/1973, quân đội tiến hành lật đổ.</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                <strong className="text-white block mb-1">Viện trợ nước ngoài:</strong>
                <p className="text-sm text-slate-400">Viện trợ cho nước khác nhưng thực chất mang lợi ích cho doanh nghiệp trong nước (VD: Mỹ viện trợ vũ khí cho Ukraine, công ty quốc phòng Mỹ nhận đơn hàng lớn từ chính phủ).</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function SectionCard({ title, icon, children }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoBlock({ title, number, children }: any) {
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 text-6xl font-black text-slate-200/50 group-hover:text-emerald-100 transition-colors z-0">
        {number}
      </div>
      <div className="relative z-10">
        <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-600">{children}</p>
      </div>
    </div>
  );
}
