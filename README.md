# MLN122 - Chuyên đề Kinh tế Chính trị Mác - Lênin

Dự án bài tập lớn / thuyết trình môn Kinh tế Chính trị Mác - Lênin (MLN122). Phân tích sự biến đổi của Tư bản Tài chính hiện đại, chế độ ủy nhiệm, và sự thống trị của các tập đoàn quản lý tài sản khổng lồ (The Big Three: BlackRock, Vanguard, State Street) thông qua lăng kính của Chủ nghĩa Mác - Lênin.

## Tính năng nổi bật (Features)

- **Lý luận & Thực tiễn**: Phân tích chi tiết các biểu hiện mới của tư bản tài chính, chế độ tham dự, chế độ uỷ nhiệm và sự tách rời giữa kinh tế thực và kinh tế ảo (Ví dụ minh hoạ: Coca-Cola vs PepsiCo).
- **Mạng lưới Sở hữu (Tracer Network)**: Công cụ tương tác trực quan (Interactive Node Graph) mô phỏng lại mạng lưới sở hữu chéo 3 tầng phức tạp của các tập đoàn. Cho phép tra cứu tự động cấu trúc cổ đông của bất kỳ công ty nào trên thị trường chứng khoán quốc tế (Tích hợp Yahoo Finance API).
- **AI Nhận diện Thương hiệu (AI Brand Recognition)**: Tích hợp trí tuệ nhân tạo (Anthropic Claude) cho phép người dùng tải lên hình ảnh một sản phẩm bất kỳ. AI sẽ tự động phân tích, nhận diện công ty/tập đoàn mẹ sở hữu sản phẩm đó, và ngay lập tức lập bản đồ mạng lưới cổ đông của công ty này.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Graph Visualization:** React Flow (`@xyflow/react`) + Dagre (layout)
- **API Data:** `yahoo-finance2` (tích hợp qua middleware của Vite)
- **AI Integration:** `@anthropic-ai/sdk` (Claude API)
- **Deployment:** Vercel

## Cài đặt & Chạy cục bộ (Local Development)

### Yêu cầu
- Node.js (khuyến nghị bản 18+ hoặc 20+)
- `pnpm` (hoặc `npm`/`yarn`)

### Các bước cài đặt

1. **Clone repository:**
   ```bash
   git clone <repo-url>
   cd MLN122-presentation
   ```

2. **Cài đặt dependencies:**
   ```bash
   pnpm install
   ```

3. **Thiết lập biến môi trường:**
   Tạo file `.env` ở thư mục gốc và thêm các API keys cần thiết:
   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Chạy Development Server:**
   ```bash
   pnpm run dev
   ```
   Ứng dụng sẽ mở tại `http://localhost:5173`.

## Cấu trúc thư mục (Folder Structure)

- `/src/pages`: Các route chính của bài thuyết trình (`TheoryPage`, `SituationPage`, `TracerPage`, `BigThreeSection`).
- `/src/components`: Component dùng chung như `NetworkGraph` (React Flow).
- `/src/hooks`: Custom hooks như `useTracer` để xử lý logic gọi API và render node.
- `vite.config.ts`: Cấu hình Vite, bao gồm cả các middleware API Server-side chạy NodeJS để proxy API của Yahoo Finance và Anthropic nhằm vượt tường lửa CORS và bảo vệ API Key.

## Deployment (Vercel)

Dự án đã được cấu hình sẵn cho nền tảng Vercel. 
- File `vercel.json` định tuyến lại (rewrite) traffic về `index.html`, giúp sửa lỗi 404 khi tải lại trang đặc trưng của Single Page Application (SPA).
- **Lưu ý quan trọng**: Phải cấu hình biến môi trường `VITE_ANTHROPIC_API_KEY` trực tiếp trên Dashboard của Vercel trước khi tiến hành deploy.

---
*Dự án phục vụ mục đích giáo dục và nghiên cứu.*
