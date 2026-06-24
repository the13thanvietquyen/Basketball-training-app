from typing import Optional
from sqlmodel import SQLModel, Field, create_engine

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str

class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    video_url: str
    category: str
    difficulty: str
    position: str = Field(default="All")  # PG, SG, SF, PF, C, All
    session: int = Field(default=1)      # 1, 2, 3, 4
    program_type: str = Field(default="Skills")  # Skills, Physical

sqlite_url = "sqlite:///./database.db"
engine = create_engine(sqlite_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)