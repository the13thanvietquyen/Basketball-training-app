from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel
from passlib.context import CryptContext

from models import create_db_and_tables, User, Exercise, engine

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Pro Hoop Training Basketball API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def get_session():
    with Session(engine) as session:
        yield session

class UserRegister(BaseModel):
    username: str
    email: str
    password: str

@app.post("/register", tags=["Auth"])
def register(user_data: UserRegister, session: Session = Depends(get_session)):
    if session.exec(select(User).where((User.username == user_data.username) | (User.email == user_data.email))).first():
        raise HTTPException(status_code=400, detail="Tài khoản hoặc Email đã tồn tại!")
    
    hashed_pwd = pwd_context.hash(user_data.password)
    new_user = User(username=user_data.username, email=user_data.email, hashed_password=hashed_pwd)
    session.add(new_user)
    session.commit()
    return {"message": "Đăng ký thành công!"}

@app.post("/login", tags=["Auth"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Sai thông tin đăng nhập!")
    return {"message": "Đăng nhập thành công!"}

@app.get("/exercises/recommend", tags=["Exercises"])
def get_exercises(category: Optional[str] = None, difficulty: Optional[str] = None, 
                  position: Optional[str] = None, session_num: Optional[int] = None, 
                  program_type: Optional[str] = "Skills",
                  session: Session = Depends(get_session)):
    query = select(Exercise)
    if category: query = query.where(Exercise.category == category)
    if difficulty: query = query.where(Exercise.difficulty == difficulty)
    if position: query = query.where((Exercise.position == position) | (Exercise.position == "All"))
    if session_num: query = query.where(Exercise.session == session_num)
    if program_type: query = query.where(Exercise.program_type == program_type)
    
    results = session.exec(query).all()
    return results 