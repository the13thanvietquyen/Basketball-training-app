# 🏀 Pro Hoop Training — Ứng dụng Hỗ trợ Tập luyện Bóng rổ Thông minh

> Ứng dụng web cá nhân hóa giáo án tập luyện bóng rổ theo **5 vị trí thi đấu** (PG, SG, SF, PF, C), tích hợp trình phát video hướng dẫn và giả lập Camera AI theo dõi động tác.

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng chính](#-tính-năng-chính)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Hướng dẫn cài đặt & chạy](#-hướng-dẫn-cài-đặt--chạy)
- [Tài liệu dự án](#-tài-liệu-dự-án)
- [Tác giả](#-tác-giả)

---

## 🎯 Tổng quan

**Pro Hoop Training** là ứng dụng web hỗ trợ tập luyện bóng rổ thông minh, được thiết kế với giao diện hiện đại theo phong cách **Dark Theme + Glassmorphism**. Ứng dụng cung cấp giáo án cá nhân hóa dựa trên vị trí thi đấu của người chơi, bao gồm cả **giáo án kỹ năng** (4 buổi/tuần) và **giáo án thể lực** (3 ngày/tuần).

---

## ✨ Tính năng chính

- 🔐 **Đăng ký / Đăng nhập** — Xác thực tài khoản với mật khẩu mã hóa bcrypt
- 🏅 **Lọc theo 5 vị trí thi đấu** — PG, SG, SF, PF, C
- 📅 **Giáo án Kỹ năng** — Lịch trình 4 buổi/tuần với bài tập chuyên biệt theo vị trí
- 💪 **Giáo án Thể lực & Sức mạnh** — Lịch trình 3 ngày/tuần
- 🎥 **Trình phát Video hướng dẫn** — Modal pop-up nhúng video YouTube
- 📷 **Giả lập Camera AI** — Theo dõi động tác qua webcam trình duyệt với hiệu ứng quét tia sáng và hộp phát hiện mục tiêu

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Frontend** | React 19 + TypeScript, Vite 8, Axios |
| **Backend** | Python, FastAPI, SQLModel, Uvicorn |
| **Database** | SQLite |
| **Bảo mật** | bcrypt (passlib) |
| **Giao diện** | CSS thuần (Dark Theme, Glassmorphism, Google Fonts - Outfit) |

---

## 📁 Cấu trúc thư mục

```
Basketball-App-Project/
├── Backend/
│   ├── main.py              # API chính (FastAPI) — Auth & Exercises
│   ├── models.py            # Database schema (User, Exercise)
│   ├── seed.py              # Nạp dữ liệu mẫu (35 bài tập)
│   ├── requirements.txt     # Thư viện Python
│   └── venv/                # Môi trường ảo (không đẩy lên Git)
│
├── Frontend/
│   ├── src/
│   │   ├── App.tsx          # Component chính
│   │   ├── App.css          # Hệ thống Design Tokens & CSS
│   │   ├── api.ts           # Cấu hình Axios
│   │   ├── components/      # Các component tái sử dụng
│   │   ├── screens/         # Các màn hình giao diện
│   │   ├── context/         # React Context
│   │   ├── hooks/           # Custom Hooks
│   │   └── utils/           # Tiện ích
│   ├── package.json
│   └── vite.config.ts
│
├── Document/
│   ├── Daily Report/        # Báo cáo tiến độ hàng tuần
│   ├── MidtermReport/       # Báo cáo giữa kỳ
│   └── FinalReport/         # Báo cáo cuối kỳ
│
├── .gitignore
└── README.md
```

---

## 💻 Yêu cầu hệ thống

- **Python** ≥ 3.10
- **Node.js** ≥ 18
- **npm** ≥ 9
- **Git**

---

## 🚀 Hướng dẫn cài đặt & chạy

### 1. Clone dự án

```bash
git clone https://github.com/the13thanvietquyen/Basketball-training-app.git
cd Basketball-training-app
```

### 2. Cài đặt & chạy Backend

```bash
# Di chuyển vào thư mục Backend
cd Backend

# Tạo môi trường ảo Python
python -m venv venv

# Kích hoạt môi trường ảo
# Windows:
venv\Scripts\activate
# macOS / Linux:
# source venv/bin/activate

# Cài đặt thư viện
pip install -r requirements.txt

# Nạp dữ liệu mẫu vào database (chỉ cần chạy 1 lần)
python seed.py

# Khởi động Backend server
uvicorn main:app --reload
```

> 🟢 Backend sẽ chạy tại: **http://localhost:8000**
>
> 📖 Truy cập tài liệu API tự động tại: **http://localhost:8000/docs**

### 3. Cài đặt & chạy Frontend

Mở **terminal mới** (giữ nguyên terminal Backend đang chạy):

```bash
# Di chuyển vào thư mục Frontend
cd Frontend

# Cài đặt dependencies
npm install

# Khởi động Frontend dev server
npm run dev
```

> 🟢 Frontend sẽ chạy tại: **http://localhost:5173**

### 4. Sử dụng ứng dụng

1. Mở trình duyệt và truy cập **http://localhost:5173**
2. **Đăng ký** tài khoản mới hoặc **Đăng nhập** nếu đã có tài khoản
3. Chọn **vị trí thi đấu** (PG / SG / SF / PF / C)
4. Chuyển đổi giữa **Giáo án Kỹ năng** và **Giáo án Thể lực**
5. Nhấn vào bài tập để xem **video hướng dẫn**
6. Sử dụng tính năng **Camera AI** để theo dõi động tác tập luyện

---

## 📄 Tài liệu dự án

| Tài liệu | Vị trí |
|-----------|--------|
| Báo cáo tiến độ hàng tuần | `Document/Daily Report/` |
| Báo cáo giữa kỳ | `Document/MidtermReport/` |
| Báo cáo cuối kỳ | `Document/FinalReport/` |

---

## 👨‍💻 Tác giả

Dự án được phát triển bởi sinh viên trong khuôn khổ môn học thực tập tại trường.

---

> ⭐ Nếu bạn thấy dự án hữu ích, hãy để lại một **Star** trên GitHub!
