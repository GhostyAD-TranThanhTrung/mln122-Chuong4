import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Building2, Briefcase, HandCoins, Network, Users, Shield, Globe, BookOpen, Rocket, AlertTriangle, Swords, Factory, Zap, Target } from 'lucide-react';
import { StateMonopolyChart } from '../components/StateMonopolyChart.tsx';

export function TheoryPage() {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

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
              <NavItem active={activeSection === 3} onClick={() => setActiveSection(3)} icon={<BookOpen />}>
                4.3.3. Vai trò lịch sử
              </NavItem>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="w-full md:w-3/4">
          <div className="space-y-12">
            {activeSection === 1 && <MonopolySection />}
            {activeSection === 2 && <StateMonopolySection />}
            {activeSection === 3 && <HistoricalRoleSection />}
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
            <p className="text-sm text-slate-700 mt-2 italic text-blue-800">Nguyên nhân: Tránh chuyên môn hóa hẹp dễ phá sản trong cạnh tranh gay gắt, và lách luật chống độc quyền (cấm độc quyền 100% một ngành).</p>
          </div>
          <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2">Conglomerate (Công-gơ-lô-mê-rết)</h4>
            <p className="text-sm text-slate-700">Là sự kết hợp của hàng chục những hãng vừa và nhỏ không có sự liên quan trực tiếp về sản xuất hoặc dịch vụ cho sản xuất.</p>
            <p className="text-sm text-slate-700 mt-2 italic text-indigo-800">Mục đích chủ yếu: Thu lợi nhuận từ kinh doanh chứng khoán. Phần lớn rất dễ phá sản hoặc phải chuyển thành Concern.</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-500" /> Vai trò của Doanh nghiệp vừa và nhỏ
          </h4>
          <p className="text-slate-700 mb-4">Bên cạnh các tổ chức độc quyền lớn lại xuất hiện nhiều doanh nghiệp vừa và nhỏ có vai trò quan trọng:</p>
          <ul className="space-y-2 text-sm text-slate-600 ml-4 list-disc marker:text-marx-red">
            <li><strong>Sự phụ thuộc:</strong> Các doanh nghiệp vừa và nhỏ phụ thuộc vào Concern và Conglomerate, dẫn đến hình thành <strong>hệ thống gia công</strong>. Thông qua hợp tác này, các độc quyền lớn mở rộng khả năng kiểm soát sản xuất và tiến bộ KH&CN.</li>
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
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Tập đoàn Vingroup</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Tập đoàn TH (TH group)</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Tập đoàn Nestlé</li>
            </ul>
          </div>
          <div className="glass p-5 rounded-xl border border-slate-200">
            <h5 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider text-amber-600">Công nghiệp - Quân sự - Dịch vụ quốc phòng</h5>
            <ul className="space-y-2 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Tập đoàn hàng không và vũ trụ Boeing</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Samsung Heavy Industries</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-marx-red" /> Mitsubishi Heavy Industries</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl">
          <h4 className="font-bold text-lg mb-4 text-amber-400">Chế độ tham dự & Sự khống chế của đại cổ đông</h4>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            Cơ chế tham dự của tư bản tài chính cũng có sự biến đổi, cổ phiếu có mệnh giá nhỏ được phát hành rộng rãi, khối lượng cổ phiếu tăng lên, nhiều tầng lớp dân cư cũng có thể mua được cổ phiếu và trở thành các cổ đông nhỏ. Đồng thời, "chế độ tham dự" được bổ sung thêm bằng "chế độ uỷ nhiệm", nghĩa là những đại cổ đông thay mặt cho đa số các cổ đông nhỏ quyết định (ví dụ: BlackRock, Vanguard).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h5 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> Khống chế trực tiếp</h5>
              <ul className="text-xs text-slate-300 space-y-1 list-disc ml-4">
                <li>Quyền biểu quyết lớn</li>
                <li>Bầu Hội đồng quản trị</li>
                <li>Bổ nhiệm CEO, Thay đổi chiến lược</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h5 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" /> Khống chế gián tiếp</h5>
              <p className="text-xs text-slate-300">Bán tháo cổ phiếu làm giá giảm mạnh, dẫn đến các nhà đầu tư khác bán theo. Gây áp lực lớn lên ban lãnh đạo qua thị trường tài chính.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="4.3.1.3. Biểu hiện mới của xuất khẩu tư bản"
        icon={<Globe className="text-emerald-500" />}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoBlock title="Hướng xuất khẩu tư bản" number="1">
            <div className="space-y-3 mt-2">
              <div>
                <strong className="text-slate-800">Trước kia:</strong> Từ các nước tư bản phát triển → các nước kém phát triển.
              </div>
              <div>
                <strong className="text-slate-800">Những thập kỷ gần đây:</strong> Nước tư bản phát triển ⇔ nước tư bản phát triển.
              </div>
              <div className="bg-white/60 p-3 rounded-lg border border-slate-100 shadow-sm">
                <strong className="text-slate-800 text-xs uppercase tracking-wider block mb-2">Nguyên nhân:</strong>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Các nước tư bản phát triển có khoa học, kỹ thuật và vốn lớn, đầu tư thu được lợi nhuận cao.</li>
                  <li>Các nước đang phát triển thì ngược lại, chính trị kém ổn định, đầu tư rủi ro,...</li>
                </ul>
              </div>
            </div>
          </InfoBlock>

          <InfoBlock title="Vai trò của TNCs" number="2">
            <div className="mt-2 text-slate-700 leading-relaxed">
              Vai trò của các công ty xuyên quốc gia <strong>(Transnational Corporation - TNCs)</strong> trong xuất khẩu tư bản ngày càng lớn.
              <br /><br />
              Đặc biệt là hình thức <strong>đầu tư trực tiếp nước ngoài (Foreign Direct Investment - FDI)</strong>.
            </div>
          </InfoBlock>

          <InfoBlock title="Đan xen hình thức xuất khẩu" number="3">
            <div className="mt-2 space-y-3">
              <p>Sự đan xen giữa xuất khẩu tư bản và xuất khẩu hàng hóa tăng lên, xuất hiện những hình thức mới như:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Xây dựng - kinh doanh - chuyển giao (Build-Operate-Transfer - BOT)</li>
                <li>Xây dựng - chuyển giao (Built and Transfer - BT)</li>
                {/* <li>...</li> */}
              </ul>
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-100 font-medium text-sm">
                Sự kết hợp giữa xuất khẩu tư bản với các hợp đồng buôn bán hàng hoá, dịch vụ, chất xám,... không ngừng tăng lên.
              </div>
            </div>
          </InfoBlock>

          <InfoBlock title="Nguyên tắc cùng có lợi" number="4">
            <div className="mt-2 flex items-start gap-3">
              <p className="leading-relaxed text-slate-700">
                Sự áp đặt mang tính chất thực dân trong xuất khẩu tư bản đã được <strong>gỡ bỏ dần</strong> và <strong>nguyên tắc cùng có lợi</strong> trong đầu tư được đề cao.
              </p>
            </div>
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

      <SectionCard
        title="4.3.1.5. Phân chia lãnh thổ ảnh hưởng"
        icon={<Globe className="text-orange-500" />}
      >
        <div className="space-y-4 text-slate-700">
          <p className="font-medium">Sự phân chia thế giới về lãnh thổ vẫn tiếp tục dưới những hình thức thống trị mới:</p>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <strong className="text-orange-900 block mb-2">Chiến lược "Biên giới mềm" (Nửa cuối TK XX)</strong>
            <p className="text-sm text-slate-700">Chủ nghĩa thực dân cũ sụp đổ, các cường quốc bành trướng "biên giới kinh tế" thay cho địa lý. Họ ràng buộc, chi phối các nước kém phát triển từ sự lệ thuộc về vốn, công nghệ đi đến lệ thuộc về chính trị.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-2">Chiến tranh hình thức mới (Thế kỷ XXI)</strong>
            <p className="text-sm text-slate-700">Nguy cơ chiến tranh thế giới bị đẩy lùi nhưng được thay bằng các cuộc chiến tranh thương mại, sắc tộc, tôn giáo. Đứng sau giật dây hoặc núp bóng các cuộc đụng độ này chính là các cường quốc tư bản.</p>
          </div>
        </div>
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
                  <strong className="text-sm text-slate-900 block mb-2">VD: Bầu cử Đức 2021</strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Đảng Dân chủ Xã hội (25.7%)</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-cyan-500 mr-1"></span> Đảng Liên Minh (25.7%)</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Đảng Xanh (14.7%)</li>
                    <li><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span> Đảng Dân chủ tự do (11.4%)</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Vì không đảng nào đều hơn 50% số ghế, cho nên hình thành liên minh Đèn Giao Thông(Đảng Dân Chủ Xã Hội, Đảng Xanh, Đảng Dân Chủ Tự Do).</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Các đảng đều chia sẻ quyền lực cho nhau, không ai hơn ai, cùng chia sẻ quản lý đất nước.</p>
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
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <strong>Phúc lợi xã hội là thành quả đấu tranh:</strong> Ngân sách chi cho môi trường, y tế, giáo dục miễn phí <em>không phải</em> do CNTB thức tỉnh hay nhân đạo hóa. Đó là <strong>thành quả đấu tranh bền bỉ</strong> của nhân dân tiến bộ, là sự "chuẩn bị vật chất của CNXH" ngay trong lòng CNTB.
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
                <strong className="text-white block mb-1">Viện trợ nước ngoài (Lợi ích cho độc quyền):</strong>
                <p className="text-sm text-slate-400">Phương thuốc cứu nguy để giải quyết hàng tồn đọng, công nghệ lỗi thời. Nước tiếp nhận viện trợ thường chỉ nhận được một phần ít ỏi ngoại tệ, còn đa phần là bị ép lấy hàng hóa, thiết bị, và chuyên gia của nước cung cấp.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function HistoricalRoleSection() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionCard
        title="4.3.3.1. Vai trò tích cực của chủ nghĩa tư bản"
        icon={<Rocket className="text-blue-500" />}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Thúc đẩy LLSX</h4>
            <ul className="text-sm text-slate-700 space-y-2 list-disc ml-4">
              <li>Phát triển khoa học - công nghệ.</li>
              <li>Từ lao động thủ công → cơ khí → tự động hóa.</li>
              <li>Nâng cao năng suất lao động.</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 shadow-sm">
            <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2"><Factory className="w-5 h-5" /> Chuyển đổi nền sản xuất</h4>
            <p className="text-sm text-slate-700 mb-2">Chuyển nền sản xuất nhỏ thành nền sản xuất lớn hiện đại.</p>
            <p className="text-sm text-slate-600 italic border-l-2 border-indigo-300 pl-2">VD: Nike sử dụng hàng ngàn công nhân để sản xuất giày dép.</p>
          </div>

          <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2"><Network className="w-5 h-5" /> Xã hội hóa sản xuất</h4>
            <p className="text-sm text-slate-700 mb-2">Các ngành nghề, quốc gia hợp tác với nhau và được phân chia rõ ràng.</p>
            <p className="text-sm text-slate-600 italic border-l-2 border-emerald-300 pl-2">VD: Apple chế tạo iPhone nhờ kết hợp thiết kế đồ họa, marketing, phần mềm một cách ăn ý.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="4.3.3.2. Những giới hạn phát triển của CNTB"
        icon={<AlertTriangle className="text-marx-red" />}
      >
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> Lợi ích tập trung vào thiểu số
            </h4>
            <p className="text-slate-700 mb-3">
              Mục đích của nền sản xuất TBCN tập trung chủ yếu vì lợi ích của giai cấp tư sản. Độc quyền tạo ra xu thế kìm hãm cơ hội phát triển kỹ thuật và sản xuất (áp giá mua thấp, giá bán cao).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-500" /> Gây ra chiến tranh và xung đột
            </h4>
            <p className="text-slate-700 mb-2">Cạnh tranh thuộc địa và thị trường dẫn đến xung đột (CTTG I, II, Chiến tranh lạnh), kéo lùi kinh tế.</p>
            <div className="bg-amber-50 text-amber-900 p-3 rounded-lg text-sm italic">
              VD: Chiến tranh Nga-Ukraine, có sự can thiệp và hỗ trợ tài chính, quân sự từ Mỹ, NATO, cũng như cấm vận kinh tế.
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Phân hóa giàu - nghèo sâu sắc
            </h4>
            <p className="text-slate-700 mb-2">Chênh lệch thu nhập giữa công nhân và doanh nghiệp ngày càng lớn. Chế độ thực dân mới dùng viện trợ để các nước đang phát triển lệ thuộc.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-slate-50 p-3 rounded-lg text-sm border-l-4 border-slate-300">
                <strong>VD: Apple</strong><br />Kỹ sư nhận 150k-250k USD/năm. Apple tạo ra hàng chục tỷ USD lợi nhuận.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-sm border-l-4 border-slate-300">
                <strong>VD: Châu Phi</strong><br />Phải trả phí "xây dựng thuộc địa" cho hạ tầng do Pháp xây trước đây.
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-md border-l-4 border-marx-red">
            <h4 className="font-bold text-xl mb-3 text-red-400">Mâu thuẫn cơ bản của chủ nghĩa tư bản</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <strong className="text-blue-300 block mb-1">Lực lượng sản xuất (Tập thể)</strong>
                <p className="text-sm text-slate-300">Ngày càng phát triển và mang tính xã hội hóa cao.</p>
              </div>
              <div>
                <strong className="text-amber-300 block mb-1">Quan hệ sản xuất (Tư nhân)</strong>
                <p className="text-sm text-slate-300">Dựa trên sở hữu tư nhân về tư liệu sản xuất, phân phối thành quả mang tính cá nhân.</p>
              </div>
            </div>
            <p className="text-sm italic text-slate-400 border-t border-slate-700 pt-3">
              VD: Nhà máy ô tô - do hàng nghìn người tạo ra (tập thể), nhưng lợi nhuận thuộc về chủ sở hữu (tư nhân). Khi mâu thuẫn này không được giải quyết, CNTB sẽ bị thay thế bởi các chế độ khác.
            </p>
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
      <div className="absolute right-2 top-2 text-7xl font-black text-slate-200/50 group-hover:text-emerald-100 transition-colors z-0 select-none pointer-events-none leading-none">
        {number}
      </div>
      <div className="relative z-10">
        <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
        <div className="text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}
