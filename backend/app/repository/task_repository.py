from sqlalchemy.orm import Session
from app.model.models import Task


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task_data: dict):
        task = Task(**task_data)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def get_tasks(self, skip: int = 0, limit: int = 100):
        return self.db.query(Task).offset(skip).limit(limit).all()

    def get_task_by_id(self, user_id: int):
        return self.db.query(Task).filter(Task.user_id == user_id).all()

    def get_task_id(self, id: int):
        return self.db.query(Task).filter(Task.id == id).first()

    def update_task(self, task_id: int, task_data: dict):
        task = self.get_task_id(task_id)
        if task:
            for key, value in task_data.items():
                setattr(task, key, value)
            self.db.commit()
            self.db.refresh(task)
        return task

    def delete_task(self, task_id: int):
        task = self.get_task_id(task_id)
        if task:
            self.db.delete(task)
            self.db.commit()
            return True
        return False
