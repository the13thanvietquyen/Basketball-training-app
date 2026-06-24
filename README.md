Tuần 1: Nghiên cứu Nghiệp vụ & Xác định Yêu cầu
Xác định mục tiêu ứng dụng: Hỗ trợ tập luyện bóng rổ thông minh cá nhân hóa cho 5 vị trí thi đấu (PG, SG, SF, PF, C).
Thiết kế kiến trúc hệ thống: Chọn FastAPI (Python) làm Backend do tốc độ nhanh, SQLModel để tương tác database và React + TypeScript (Vite) làm Frontend để tối ưu hóa trải nghiệm người dùng.
Tuần 2: Thiết kế Cơ sở Dữ liệu & Wireframe UI
Thiết kế ERD (Entity Relationship Diagram) cho cơ sở dữ liệu SQLite bao gồm bảng người dùng (User) và bảng bài tập (Exercise).
Vẽ phác thảo giao diện (Wireframe) theo phong cách hiện đại: Dark theme chủ đạo kết hợp các vệt sáng neon cam/xanh và giao diện kính mờ (glassmorphism).
GIAI ĐOẠN 2: XÂY DỰNG NỀN TẢNG BACKEND & APIS (Tuần 3 - Tuần 4)
Tuần 3: Thiết lập Môi trường & Khởi tạo Database Models
Cài đặt môi trường ảo Python (venv), cài đặt thư viện cần thiết (FastAPI, SQLModel, passlib, uvicorn, pydantic).
Hiện thực hóa database schema trong tệp models.py với các lớp User và Exercise hỗ trợ lưu trữ thông tin độ khó, vị trí, buổi tập và liên kết video.
Tuần 4: Hoàn thiện API Đăng ký / Đăng nhập & CORS
Viết logic đăng ký tài khoản (mã hóa mật khẩu bằng bcrypt) và đăng nhập xác thực tài khoản trong main.py.
Cấu hình CORSMiddleware trên FastAPI để cho phép Frontend React giao tiếp an toàn qua các cổng khác nhau.
GIAI ĐOẠN 3: PHÁT TRIỂN NỀN TẢNG FRONTEND & STYLE SYSTEM (Tuần 5 - Tuần 6)
Tuần 5: Khởi tạo Project Frontend & Cấu hình Axios
Khởi tạo dự án React + TypeScript bằng Vite. Cấu hình Axios (api.ts) hỗ trợ gọi API Backend một cách nhất quán.
Xây dựng khung cấu trúc dự án bao gồm thư mục Components, Services và Assets.
Tuần 6: Xây dựng Hệ thống Design Tokens & CSS
Xây dựng tệp App.css định nghĩa các biến màu sắc toàn cục (:root variables) với mã màu cam bóng rổ cao cấp và xanh cyan.
Áp dụng font chữ hiện đại (Outfit từ Google Fonts) thay thế cho font mặc định của hệ thống.
Thiết kế khối Glassmorphic Card có viền phát sáng động và các nút bấm bo cong mềm mại.
GIAI ĐOẠN 4: THỰC HIỆN TÍNH NĂNG CÁ NHÂN HÓA BÀI TẬP KỸ NĂNG (Tuần 7 - Tuần 8)
Tuần 7: Tích hợp Lọc theo 5 Vị trí thi đấu (PG, SG, SF, PF, C)
Cập nhật API /exercises/recommend ở Backend để nhận tham số lọc position.
Tạo thanh chọn vị trí (Position Selector Tabs) ở Frontend, tự động gửi yêu cầu API mỗi khi người dùng thay đổi lựa chọn vị trí.
Tuần 8: Triển khai Lưới Giáo án Lịch trình 4 Buổi/Tuần
Bổ sung trường session vào cơ sở dữ liệu. Cập nhật mã nguồn nạp dữ liệu mẫu (seed.py) với 20 bài tập kỹ năng thực tế chia đều cho 5 vị trí × 4 buổi tập.
Xây dựng cấu trúc lưới 4 cột (Buổi 1 đến Buổi 4) ở Frontend, hiển thị thẻ bài tập chi tiết và tự động cập nhật dữ liệu tương ứng.
GIAI ĐOẠN 5: TÍCH HỢP TRÌNH PHÁT VIDEO & GIẢ LẬP CAMERA AI (Tuần 9 - Tuần 10)
Tuần 9: Khắc phục Lỗi Nhúng Video (Vấn đề SAMEORIGIN)
Phát hiện lỗi YouTube chặn hiển thị iframe đối với đường dẫn xem trực tiếp (/watch?v=...).
Phát triển thuật toán phân tích regex ở Frontend để tách ID video và tự động chuyển đổi thành định dạng link nhúng hợp lệ (/embed/...).
Tạo cửa sổ trình xem video kính mờ (modal pop-up) phát trực tiếp ngay trên trang web.
Tuần 10: Giả lập Camera AI Theo dõi Động tác
Sử dụng thư viện API webcam của trình duyệt để yêu cầu quyền truy cập và hiển thị luồng video camera trực tiếp trên bảng điều khiển.
Viết logic giả lập thuật toán AI tracking: Quét chùm tia sáng quét ngang và hiển thị hộp phát hiện mục tiêu (Hoop Detected) cùng chấm tròn bám đuổi quả bóng chuyển động ngẫu nhiên.
GIAI ĐOẠN 6: GIÁO ÁN THỂ LỰC (3 NGÀY), TỐI ƯU HÓA & ĐÓNG GÓI (Tuần 11 - Tuần 12)
Tuần 11: Tích hợp Giáo án Thể lực & Sức mạnh (3 Ngày/Tuần)
Mở rộng database schema: Bổ sung trường program_type vào database. Nạp thêm 15 bài tập thể chất mới vào seed.py.
Tạo bộ lọc tab chuyển đổi Giáo án ở Frontend (không sử dụng emoji để duy trì phong cách tinh tế).
Viết CSS responsive động cho lưới hiển thị: Tự động đổi thành 3 cột (Ngày 1 -> Ngày 3) đối với giáo án thể chất và 4 cột đối với giáo án kỹ năng.
Tuần 12: Kiểm thử, Tối ưu hóa Git & Bàn giao Dự án
Tiến hành kiểm thử giao diện và độ tin cậy của liên kết video trên trình duyệt bằng các tác nhân AI ảo.
Cấu hình lại Git: Untrack toàn bộ thư mục ảo venv và file nhị phân SQLite database.db để làm sạch mã nguồn.
Đóng gói mã nguồn và đẩy lên GitHub thành công. Bàn giao sản phẩm chạy ổn định cục bộ.
