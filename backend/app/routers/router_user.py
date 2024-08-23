#router_user.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.database.schemas import RequestUser, ResponseUser
from app.controllers import crud_user
from app.security_jwt.middleware_check import check_jwt_token

user = APIRouter()

@user.post('/create')
async def create_user(request: RequestUser, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    created_user = crud_user.create_user(db, request)
    return ResponseUser(user=created_user).dict(exclude_none=True)

@user.get('')
async def get_users(db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    users = crud_user.get_users(db)
    return ResponseUser(user=users).dict(exclude_none=True)

@user.get('/{id}')
async def get_user_by_id(id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    user = crud_user.get_user_by_id(db, id)
    return ResponseUser(user=user).dict(exclude_none=True)

@user.put('/update/{id}')
async def update_user(request: RequestUser, id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    updated_user = crud_user.update_user(db, id, request)
    return ResponseUser(user=updated_user).dict(exclude_none=True)

@user.delete('/delete/{id}')
async def delete_user(id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    deleted = crud_user.delete_user(db, id)
    return {"success": deleted}