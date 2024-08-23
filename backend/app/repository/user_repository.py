#user_repository.py
from sqlalchemy.orm import Session
from app.model.models import User
from passlib.context import CryptContext

passlib_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
class UserRepository:
    def hash_password(self, password: str) -> str:
        return passlib_context.hash(password)
    
    def __init__(self, db: Session): 
        self.db = db

    def create_user(self, user_data: dict):
        if 'password' in user_data:
            user_data['password'] = self.hash_password(user_data['password'])
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_users(self, skip: int = 0, limit: int = 100):
        return self.db.query(User).offset(skip).limit(limit).all()

    def get_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def update_user(self, user_id: int, user_data: dict):
        user = self.get_user_by_id(user_id)
        if user:
            for key, value in user_data.items():
                if key == 'password':
                    value = self.hash_password(value)
                setattr(user, key, value)
            self.db.commit()
            self.db.refresh(user)
        return user

    def delete_user(self, user_id: int):
        user = self.get_user_by_id(user_id)
        if user:
            self.db.delete(user)
            self.db.commit()
            return True
        return False