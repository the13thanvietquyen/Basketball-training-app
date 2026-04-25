from typing import Optional, List
from datetime import datetime
from enum import Enum
from sqlmodel import Field, SQLModel, Relationship, create_engine

class UserRole(str, Enum):
    TRAINEE = "trainee"
    COACH = "coach"
    ADMIN = "admin"

class SubscriptionPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price: float
    duration_days: int
    transactions: List["Transaction"] = Relationship(back_populates="plan")

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(unique=True)
    hashed_password: str
    role: UserRole = Field(default=UserRole.TRAINEE)
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    is_premium: bool = Field(default=False)
    premium_until: Optional[datetime] = None
    progress: List["UserProgress"] = Relationship(back_populates="user")
    transactions: List["Transaction"] = Relationship(back_populates="user")

class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    category: str
    description: str
    video_url: str
    difficulty: str
    is_premium_only: bool = Field(default=False)
    user_progress: List["UserProgress"] = Relationship(back_populates="exercise")

class UserProgress(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    exercise_id: int = Field(foreign_key="exercise.id")
    completed_at: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None
    user: User = Relationship(back_populates="progress")
    exercise: Exercise = Relationship(back_populates="user_progress")

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    plan_id: int = Field(foreign_key="subscriptionplan.id")
    amount: float
    status: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="transactions")
    plan: SubscriptionPlan = Relationship(back_populates="transactions")

class Video(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    total_shots: int = 0
    made_shots: int = 0

    shots: List["Shot"] = Relationship(back_populates="video")


class Shot(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    video_id: int = Field(foreign_key="video.id")
    frame: int
    success: bool
    angle: Optional[float] = None

    video: Optional[Video] = Relationship(back_populates="shots")

sqlite_url = "sqlite:///database.db"
engine = create_engine(sqlite_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_db_and_tables()
    print("Database da duoc tao.")