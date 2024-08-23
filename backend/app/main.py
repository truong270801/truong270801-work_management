from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database.config import get_db, Base, engine
from app.database.schemas import TokenRefreshRequest
from app.model.models import User
from app.routers.router_user import user
from app.routers.router_task import task
from app.security_jwt.jwt import create_jwt_token,decode_jwt_token, create_refresh_token
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv

load_dotenv()

admin_username = os.getenv("ADMIN_USERNAME")
admin_password = os.getenv("ADMIN_PASSWORD")
admin_fullname = os.getenv("ADMIN_FULLNAME")

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello World!!!"}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def create_user(db: Session):
    existing_user = db.query(User).filter(User.username == admin_username).first()
    if not existing_user:
        try:
            user = User(
                username=admin_username,
                password=hash_password(admin_password),
                fullname=admin_fullname
            )
            db.add(user)
            db.commit()
        except IntegrityError:
            db.rollback()

Base.metadata.create_all(bind=engine)

with next(get_db()) as db:
    create_user(db)

@app.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = User.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Wrong account or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
    access_token = create_jwt_token(
        data={"sub": user.username},  
        expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        data={"sub": user.username},
        expires_delta=refresh_token_expires
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

    return {"access_token": new_access_token, "token_type": "bearer"}

@app.post("/refreshtoken")
async def refresh_token(token_request: TokenRefreshRequest, db: Session = Depends(get_db)):
    refresh_token = token_request.refresh_token

    payload = decode_jwt_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_jwt_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )

    return {"access_token": new_access_token, "token_type": "bearer"}

app.include_router(user, prefix="/users", tags=["Users"])
app.include_router(task, prefix="/tasks", tags=["Tasks"])
