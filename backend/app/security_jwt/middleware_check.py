from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.security_jwt.jwt import decode_jwt_token
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

minutes = int(os.getenv("TOKEN_MINUTES"))

async def check_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    token = credentials.credentials
    payload = decode_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    exp = payload.get("exp")
    if exp and datetime.utcfromtimestamp(exp) - datetime.utcnow() < timedelta(minutes=minutes):
        raise HTTPException(status_code=401, detail="Token is about to expire")
    
    return payload

