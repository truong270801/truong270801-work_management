#schemas.py
from typing import Optional,Generic, TypeVar
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel

T = TypeVar('T')
class userSchema(BaseModel):
    fullname:Optional[str] = None
    username:Optional[str] = None
    password:Optional[str] = None
   
    class Config:
        from_attributes = True

class RequestUser(BaseModel):
    user: userSchema = Field(...)

class ResponseUser (GenericModel,Generic[T]):
    user: Optional[T] 

class taskSchema(BaseModel):
    user_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[str] = None
    created_at: Optional[str] = None
    level: Optional[str] = None 
    
    class Config:
        from_attributes = True

class RequestTask(BaseModel):
    task: taskSchema = Field(...)

class ResponseTask(GenericModel, Generic[T]):
    task: Optional[T] 

class TokenRefreshRequest(BaseModel):
    refresh_token: str

