from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.database.session import get_db
from app.models.citizen import Citizen
from app.models.mp_user import MPUser
from app.core.security import SECRET_KEY, ALGORITHM

security = HTTPBearer()

def get_current_user_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        role: str = payload.get("role")
        if user_id is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return user_id, role
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def get_current_citizen(
    token_data: tuple = Depends(get_current_user_token),
    db: Session = Depends(get_db)
) -> Citizen:
    user_id, role = token_data
    if role != "citizen":
        raise HTTPException(status_code=403, detail="Not authorized as citizen")
        
    citizen = db.query(Citizen).filter(Citizen.id == int(user_id)).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
        
    return citizen

def get_current_mp(
    token_data: tuple = Depends(get_current_user_token),
    db: Session = Depends(get_db)
) -> MPUser:
    user_id, role = token_data
    if role != "mp":
        raise HTTPException(status_code=403, detail="Not authorized as MP/Official")
        
    mp = db.query(MPUser).filter(MPUser.id == int(user_id)).first()
    if not mp:
        raise HTTPException(status_code=404, detail="MP User not found")
        
    return mp

def get_mp_region_filter(current_mp: MPUser = Depends(get_current_mp)) -> dict:
    """
    Returns a dictionary of region filters based on the MP's scope.
    """
    return {
        "state": current_mp.state,
        "district": current_mp.district,
        "constituency": current_mp.constituency
    }
