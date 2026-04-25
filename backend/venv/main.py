from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from passlib.context import CryptContext

# Import các bảng và engine từ file models.py của bạn
from models import create_db_and_tables, User, engine

app = FastAPI(title="Basketball Training API")

# Cấu hình công cụ băm mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Khởi tạo DB khi bật server
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Hàm kết nối Database
def get_session():
    with Session(engine) as session:
        yield session

# --- ĐỊNH NGHĨA DỮ LIỆU ĐẦU VÀO ---
class UserRegister(BaseModel):
    username: str
    email: str
    password: str

# --- API CHÍNH ---
@app.get("/")
def root():
    return {"message": "Hệ thống Backend của Basketball App đang chạy rất mượt mà!"}

@app.post("/register", tags=["Authentication"])
def register_user(user_data: UserRegister, session: Session = Depends(get_session)):
    # 1. Kiểm tra xem Username hoặc Email đã có ai dùng chưa
    statement = select(User).where((User.username == user_data.username) | (User.email == user_data.email))
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username hoặc Email đã được sử dụng!")

    # 2. Mã hóa mật khẩu
    hashed_pwd = pwd_context.hash(user_data.password)

    # 3. Tạo User mới để chuẩn bị lưu vào bảng User
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_pwd
    )

    # 4. Lưu chính thức vào Database
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {
        "message": "Đăng ký thành công!", 
        "user_id": new_user.id,
        "username": new_user.username
    } 