Basketball Training App
Mục tiêu: Xây dựng ứng dụng hỗ trợ tập luyện bóng rổ và thể lực.

Công nghệ sử dụng
Ngôn ngữ: Python 3.14 (Backend)
Framework: FastAPI
Database: SQLite & SQLModel

Tuần 1 – Phân tích yêu cầu & thiết kế hệ thống
Nội dung đã làm:
Xác định mục tiêu:
Phân tích video tập luyện bóng rổ
Đếm số cú ném (shot)
Hiển thị kết quả qua UI
Nghiên cứu mô hình ứng dụng như HomeCourt
Xác định hướng phát triển:
Không realtime
Xử lý video có sẵn (offline)
Kết quả:
Định nghĩa được input/output hệ thống
Lựa chọn công nghệ:
Python
SQLite
Computer Vision

Tuần 2 – Thiết kế cơ sở dữ liệu
Nội dung đã làm:
Thiết kế các bảng:
User
Exercise
Subscription
Sử dụng:
SQLModel
SQLite
Nhận xét:
Database ban đầu thiên về hệ thống tổng thể
Chưa gắn trực tiếp với xử lý video

Tuần 3 – Xây dựng backend cơ bản
Nội dung đã làm:
Khởi tạo API với:
FastAPI
Tạo:
endpoint /
Kết nối database:
create_db_and_tables()
Kết quả:
Backend chạy thành công
Có thể test API

Tuần 4 – Hoàn thiện cấu trúc backend
Nội dung đã làm:
Tổ chức project:
main.py
model.py
Tạo engine SQLite
Kiểm tra tạo bảng tự động
Hạn chế:
Chưa có logic xử lý video
API chưa có chức năng chính

Tuần 5 – Tích hợp xử lý video (CORE)
Nội dung đã làm:
Xây dựng file processor.py
Sử dụng:
OpenCV
Viết hàm:
process_video(video_path)
Kết quả:
Đọc được video
Duyệt frame
Trả về kết quả (tạm thời)

Tuần 6 – Xây dựng API xử lý video
Nội dung đã làm:
Thêm endpoint:
/process-video
Xử lý:
Upload video
Lưu file
Gọi process_video()
Lưu kết quả vào database (Video model)
Kết quả:
Hệ thống hoạt động end-to-end:
Upload → xử lý → trả kết quả

Tuần 7 – Phát triển UI (bắt buộc theo môn)
Nội dung sẽ làm:
Xây dựng giao diện bằng:
Streamlit (khuyến nghị)
Tính năng:
Upload video
Hiển thị video
Nút "Process"
Hiển thị:
total shots
made shots
Kết quả mong đợi:
Demo trực quan cho người dùng

Tuần 8 – Hoàn thiện & nâng cấp thuật toán
Nội dung sẽ làm:
Tích hợp:
MediaPipe
Cải thiện:
detect chuyển động tay
xác định cú ném
(Optional):
Tính góc ném
Hiển thị biểu đồ






