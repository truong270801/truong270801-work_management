#crud.py
from sqlalchemy.orm import Session
from app.database.schemas import RequestTask
from app.repository.task_repository import TaskRepository

def create_task(db: Session, request: RequestTask):
    repository = TaskRepository(db)
    return repository.create_task(request.task.dict())

def get_tasks(db: Session):
    repository = TaskRepository(db)
    return repository.get_tasks()

def get_task_by_id(db: Session, user_id: int):
    repository = TaskRepository(db)
    return repository.get_task_by_id(user_id)

def update_task(db: Session, id: int, request: RequestTask):
    repository = TaskRepository(db)
    return repository.update_task(id, request.task.dict())

def delete_task(db: Session, id: int):
    repository = TaskRepository(db)
    return repository.delete_task(id)

