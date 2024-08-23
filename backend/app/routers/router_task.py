from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.database.schemas import RequestTask, ResponseTask
from app.security_jwt.middleware_check import check_jwt_token
from app.controllers import crud_task

task = APIRouter()

@task.post('/create')
async def create_stream(request: RequestTask, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    created_task = crud_task.create_task(db, request)
    return ResponseTask(task = created_task).dict(exclude_none=True)

@task.get('')
async def get_task(db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    task = crud_task.get_tasks(db)
    return ResponseTask(task=task).dict(exclude_none=True)

@task.get('/{id}')
async def get_task_by_id(id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    task = crud_task.get_task_by_id(db, id)
    return ResponseTask(task=task).dict(exclude_none=True)

@task.put('/update/{id}')
async def update_task(request: RequestTask, id: int, db: Session = Depends(get_db),token_payload: dict = Depends(check_jwt_token)):
    updated_task = crud_task.update_task(db, id, request)
    return ResponseTask(task=updated_task).dict(exclude_none=True)

@task.delete('/delete/{id}')
async def delete_task(id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    deleted = crud_task.delete_task(db, id)
    return {"success": deleted}
