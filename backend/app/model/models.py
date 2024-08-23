# model.py
from app.database.config import Base
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

passlib_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    tasks = relationship("Task", back_populates="owner")

    def check_password(self, password: str) -> bool:
        return passlib_context.verify(password, self.password)

    @staticmethod
    def authenticate_user(db: Session, username: str, password: str):
        user = db.query(User).filter(User.username == username).first()
        if not user or not user.check_password(password):
            return None
        return user

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, nullable=False)
    deadline = Column(String, nullable=True)
    created_at = Column(String, nullable=False)
    level = Column(String, nullable=False)
 
    owner = relationship("User", back_populates="tasks")
